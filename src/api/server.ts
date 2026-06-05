import 'dotenv/config';
import express from 'express';
import rateLimit from 'express-rate-limit';
import { paymentMiddleware, setSettlementOverrides, x402ResourceServer } from '@x402/express';
import { UptoEvmScheme } from '@x402/evm/upto/server';
import { HTTPFacilitatorClient } from '@x402/core/server';
import { cacheGet, cacheSet, TTL, hourBucket } from '../cache';
import { getMorningBrief } from './messari';
import { runResearch, VALID_TYPES } from './services/research';
import { walletAddress } from '../core/x402Client';

const app = express();

// ── Security checks ────────────────────────────────────────────────────────────

const PROVIDER_WALLET = process.env.PROVIDER_WALLET_ADDRESS;
if (!PROVIDER_WALLET) throw new Error('PROVIDER_WALLET_ADDRESS not set in .env');

if (PROVIDER_WALLET.toLowerCase() === walletAddress.toLowerCase()) {
  console.warn(
    '⚠️  SECURITY WARNING: PROVIDER_WALLET_ADDRESS is the same as the spending wallet.\n' +
    '   Revenue and spending share the same hot wallet — use a separate cold wallet for PROVIDER_WALLET_ADDRESS in production.'
  );
}

// ── Rate limiting — before payment middleware ──────────────────────────────────

app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests from this IP, please try again after 15 minutes.' },
}));

// ── x402 facilitator setup ─────────────────────────────────────────────────────

const facilitator = new HTTPFacilitatorClient({ url: 'https://x402.org/facilitator' });
const server = new x402ResourceServer(facilitator)
  .register('eip155:8453', new UptoEvmScheme());

app.use(
  paymentMiddleware(
    {
      'GET /v1/morning': {
        accepts: [{
          scheme: 'upto',
          price: '$0.07',
          network: 'eip155:8453',
          payTo: PROVIDER_WALLET,
        }],
        description: 'Daily crypto alpha brief: market overview, top movers, trending assets. Powered by CoinGecko + BlockRun AI. Cached 90min.',
        mimeType: 'application/json',
      },
      'GET /v1/research': {
        accepts: [{
          scheme: 'upto',
          price: '$0.35',
          network: 'eip155:8453',
          payTo: PROVIDER_WALLET,
        }],
        description: 'On-demand crypto research synthesis powered by Messari AI. Pass query + type (diligence | bullbear | compare | narrative | risk | tweet). Example: /v1/research?query=solana&type=bullbear',
        mimeType: 'application/json',
      },
    },
    server,
  )
);

// ── GET /v1/morning ────────────────────────────────────────────────────────────

app.get('/v1/morning', async (req, res) => {
  try {
    const key = `morning:${hourBucket()}`;
    const cached = cacheGet<string>(key);

    if (cached) {
      setSettlementOverrides(res, { amount: '0' });
      return res.json({ brief: cached, cached: true });
    }

    const { text: brief, costUsd } = await getMorningBrief();

    const settleAtomic = Math.round((costUsd + 0.015) * 1_000_000);
    setSettlementOverrides(res, { amount: String(settleAtomic) });

    cacheSet(key, brief, TTL.MORNING);
    res.json({ brief, cached: false, costUsd });

  } catch (err: any) {
    console.error('[/v1/morning]', err.message);
    res.status(500).json({ error: err.message });
  }
});

// ── GET /v1/research ───────────────────────────────────────────────────────────

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

    // Messari AI $0.25 + gas $0.015 = $0.265 = 265,000 USDC atomic units
    setSettlementOverrides(res, { amount: '265000' });

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

// ── GET /openapi.json ──────────────────────────────────────────────────────────

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

// ──────────────────────────────────────────────────────────────────────────────

const PORT = parseInt(process.env.SERVER_PORT ?? '3000');
app.listen(PORT, () => {
  console.log(`x402 server running on port ${PORT} — Base Mainnet`);
  console.log(`  GET /v1/morning    — $0.07 max`);
  console.log(`  GET /v1/research   — $0.35 max`);
  console.log(`  GET /openapi.json  — free`);
});
