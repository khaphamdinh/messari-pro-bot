import 'dotenv/config';
import express from 'express';
import { paymentMiddleware, setSettlementOverrides, x402ResourceServer } from '@x402/express';
import { UptoEvmScheme } from '@x402/evm/upto/server';
import { HTTPFacilitatorClient } from '@x402/core/server';
import { createFacilitatorConfig } from '@coinbase/x402';
import { cacheGet, cacheSet, TTL, hourBucket } from '../cache';
import { getMorningBrief } from './messari';
import { runResearch, VALID_TYPES } from './services/research';

const app = express();

const PROVIDER_WALLET = process.env.PROVIDER_WALLET_ADDRESS;
if (!PROVIDER_WALLET) throw new Error('PROVIDER_WALLET_ADDRESS not set in .env');

// CDP credentials → Base Mainnet (production)
// No credentials  → x402.org testnet (local dev / CI)
const HAS_CDP = !!(process.env.CDP_API_KEY_ID && process.env.CDP_API_KEY_SECRET);

const facilitatorConfig = HAS_CDP
  ? createFacilitatorConfig(process.env.CDP_API_KEY_ID!, process.env.CDP_API_KEY_SECRET!)
  : { url: 'https://x402.org/facilitator' };

const NETWORK = HAS_CDP ? 'eip155:8453' : 'eip155:84532';

const facilitator = new HTTPFacilitatorClient(facilitatorConfig);
const server = new x402ResourceServer(facilitator)
  .register(NETWORK, new UptoEvmScheme());

app.use(
  paymentMiddleware(
    {
      'GET /v1/morning': {
        accepts: [{
          scheme: 'upto',
          price: '$0.07',
          network: NETWORK,
          payTo: PROVIDER_WALLET,
        }],
        description: 'Daily crypto alpha brief: market overview, top movers, trending assets. Powered by CoinGecko + BlockRun AI. Cached 90min.',
        mimeType: 'application/json',
      },
      'GET /v1/research': {
        accepts: [{
          scheme: 'upto',
          price: '$0.35',
          network: NETWORK,
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

    // Settle actual cost: gas ~$0.015 + BlockRun cost (0 or $0.001)
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

// ──────────────────────────────────────────────────────────────────────────────

const PORT = parseInt(process.env.SERVER_PORT ?? '3000');
app.listen(PORT, () => {
  const mode = HAS_CDP ? 'PRODUCTION (Base Mainnet)' : 'DEV (Base Sepolia testnet)';
  console.log(`x402 server running on port ${PORT} — ${mode}`);
  console.log(`  GET /v1/morning   — $0.07 max (CoinGecko + BlockRun)`);
  console.log(`  GET /v1/research  — $0.35 max (Messari AI synthesis)`);
});
