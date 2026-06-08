// Polyfill globalThis.crypto for Node.js < 19 (Railway runs Node 18)
import { webcrypto } from 'node:crypto';
if (typeof (globalThis as any).crypto === 'undefined') {
  (globalThis as any).crypto = webcrypto;
}

import 'dotenv/config';
import express from 'express';
import rateLimit from 'express-rate-limit';
import { paymentMiddleware, x402ResourceServer } from '@x402/express';
import { UptoEvmScheme } from '@x402/evm/upto/server';
import { ExactEvmScheme } from '@x402/evm/exact/server';
import { HTTPFacilitatorClient } from '@x402/core/server';
import { declareDiscoveryExtension } from '@x402/extensions/bazaar';
import { runResearch, VALID_TYPES } from '../services/research';
import { walletAddress } from '../core/x402Client';

const app = express();
app.set('trust proxy', true);

// ── Security checks ────────────────────────────────────────────────────────────

const PROVIDER_WALLET = process.env.PROVIDER_WALLET_ADDRESS;
if (!PROVIDER_WALLET) throw new Error('PROVIDER_WALLET_ADDRESS not set in .env');

if (PROVIDER_WALLET.toLowerCase() === walletAddress.toLowerCase()) {
  console.warn(
    '⚠️  SECURITY WARNING: PROVIDER_WALLET_ADDRESS is the same as the spending wallet.\n' +
    '   Revenue and spending share the same hot wallet — use a separate cold wallet for PROVIDER_WALLET_ADDRESS in production.'
  );
}

// ── Rate limiting ──────────────────────────────────────────────────────────────

app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests from this IP, please try again after 15 minutes.' },
}));

// ── x402 constants ──────────────────────────────────────────────────────────────

const HAS_CDP = !!(process.env.CDP_API_KEY_ID && process.env.CDP_API_KEY_SECRET);
const NETWORK = HAS_CDP ? 'eip155:8453' : 'eip155:84532';

// ── Async init — dynamic import avoids CJS require() of pure-ESM jose ─────────
// @coinbase/cdp-sdk bundles jose v6 (pure ESM). Static require() fails in CJS
// output. Dynamic import() loads the ESM build of @coinbase/x402 instead.

(async () => {

  const facilitatorConfig = HAS_CDP
    ? await (async () => {
        const { createFacilitatorConfig } = await import('@coinbase/x402');
        return createFacilitatorConfig(process.env.CDP_API_KEY_ID!, process.env.CDP_API_KEY_SECRET!);
      })()
    : { url: 'https://facilitator.x402.org' };

  const facilitator = new HTTPFacilitatorClient(facilitatorConfig);
  const server = new x402ResourceServer(facilitator)
    .register(NETWORK, new UptoEvmScheme())
    .register(NETWORK, new ExactEvmScheme());

  // ── Payment middleware ───────────────────────────────────────────────────────

  app.use(
    paymentMiddleware(
      {
        'GET /v1/research': {
          accepts: [
            { scheme: 'upto',  price: '$0.35', network: NETWORK, payTo: PROVIDER_WALLET },
            { scheme: 'exact', price: '$0.35', network: NETWORK, payTo: PROVIDER_WALLET },
          ],
          description: 'On-demand crypto research synthesis powered by Messari AI. Pass query + type (diligence | bullbear | compare | narrative | risk | tweet). Example: /v1/research?query=solana&type=bullbear',
          mimeType: 'application/json',
          serviceName: 'Messari Pro API',
          tags: ['crypto', 'research', 'ai', 'messari', 'defi'],
          extensions: declareDiscoveryExtension({
            input: { query: 'solana', type: 'bullbear' },
            inputSchema: {
              properties: {
                query: { type: 'string', description: 'Asset name or research topic (max 200 chars)' },
                type: { type: 'string', enum: ['diligence', 'bullbear', 'compare', 'narrative', 'risk', 'tweet'], default: 'diligence' },
              },
              required: ['query'],
            },
            output: {
              example: { analysis: 'Solana bulls point to...', sources: [], type: 'bullbear', query: 'solana' },
            },
          }),
        },
      },
      server,
    )
  );

  // ── GET / ────────────────────────────────────────────────────────────────────

  app.get('/', (req, res) => {
    res.json({
      name: 'Messari Pro x402 API',
      version: '2.0.0',
      description: 'Crypto intelligence API paid via x402 protocol (USDC on Base). No API keys required.',
      endpoints: {
        '/v1/research': {
          method: 'GET',
          price: '$0.35',
          description: 'On-demand crypto research synthesis powered by Messari AI.',
          params: {
            query: 'required - asset name or research topic (max 200 chars)',
            type: 'optional - diligence | bullbear | compare | narrative | risk | tweet (default: diligence)',
          },
        },
        '/openapi.json': {
          method: 'GET',
          price: 'free',
          description: 'OpenAPI 3.0 specification',
        },
      },
      docs: 'See /openapi.json for full API specification',
    });
  });

  // ── GET /v1/research ─────────────────────────────────────────────────────────

  app.get('/v1/research', async (req, res) => {
    const query = (req.query.query as string)?.trim();
    const type  = ((req.query.type as string) || 'diligence').trim().toLowerCase();

    if (!query) {
      return res.status(400).json({ error: 'query parameter is required' });
    }

    if (query.length > 200) {
      return res.status(400).json({ error: 'query must be 200 characters or less' });
    }

    if (!VALID_TYPES.includes(type as any)) {
      return res.status(400).json({
        error: `invalid type. Must be one of: ${VALID_TYPES.join(', ')}`,
      });
    }

    try {
      const result = await runResearch(query, type);

      res.json({
        analysis: result.text,
        sources: result.sources,
        type: result.type,
        query: result.query,
      });

    } catch (err: any) {
      console.error('[/v1/research]', err.message);
      res.status(500).json({ error: err.message });
    }
  });

  // ── GET /openapi.json ────────────────────────────────────────────────────────

  app.get('/openapi.json', (req, res) => {
    res.json({
      openapi: '3.0.0',
      info: {
        title: 'Messari Pro x402 API',
        version: '2.0.0',
        description: 'Crypto intelligence API paid via x402 protocol (USDC on Base). No API keys required.',
      },
      paths: {
        '/v1/morning': {
          get: {
            summary: 'Daily Crypto Alpha Brief',
            description: 'Market snapshot from CoinGecko synthesized by BlockRun AI. Cached 90 min — cache hits settle $0.',
            responses: {
              '200': { description: 'Returns { brief: string, cached: boolean, costUsd: number }' },
              '402': { description: 'Payment required — attach x402 PAYMENT-SIGNATURE header' },
            },
          },
        },
        '/v1/research': {
          get: {
            summary: 'On-demand Messari AI Research',
            description: 'Deep crypto research using Messari AI v2 with structured analytical templates.',
            parameters: [
              {
                name: 'query',
                in: 'query',
                required: true,
                schema: { type: 'string', maxLength: 200 },
                description: 'Asset name or research topic (e.g. "solana", "ETH vs SOL")',
              },
              {
                name: 'type',
                in: 'query',
                required: false,
                schema: {
                  type: 'string',
                  default: 'diligence',
                  enum: ['diligence', 'bullbear', 'compare', 'narrative', 'risk', 'tweet'],
                },
                description: 'Report template type',
              },
            ],
            responses: {
              '200': { description: 'Returns { analysis: string, sources: array, type: string, query: string }' },
              '400': { description: 'Missing or invalid query/type parameters' },
              '402': { description: 'Payment required — attach x402 PAYMENT-SIGNATURE header' },
            },
          },
        },
      },
    });
  });

  // ── Start ────────────────────────────────────────────────────────────────────

  const PORT = parseInt(process.env.SERVER_PORT ?? '3000');
  app.listen(PORT, () => {
    const mode = HAS_CDP ? 'PRODUCTION (Base Mainnet)' : 'DEV (Base Sepolia testnet)';
    console.log(`x402 server running on port ${PORT} — ${mode}`);
    console.log(`  GET /v1/research   — $0.35`);
    console.log(`  GET /openapi.json  — free`);
  });

})().catch(err => {
  console.error('Fatal: server failed to start:', err);
  process.exit(1);
});

