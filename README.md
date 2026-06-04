# Crypto Intelligence API — x402 HTTP Service

A pay-per-request crypto intelligence API using the **x402 protocol** (USDC on Base). No API keys, no subscriptions — agents pay per call.

Listed on [Agentic.Market](https://agentic.market).

---

## Endpoints

| Endpoint | Max Price | Description |
|----------|-----------|-------------|
| `GET /v1/morning` | $0.07 | Daily market brief. CoinGecko data + AI synthesis. Cached 90 min — cache hits settle $0. |
| `GET /v1/research?query=&type=` | $0.35 | On-demand research powered by Messari AI. |

**Research types:** `diligence` `bullbear` `compare` `narrative` `risk` `tweet`

Both endpoints use the **upto scheme** — agent authorizes a maximum, server settles actual cost.

```bash
# Returns HTTP 402 with PAYMENT-REQUIRED header (x402v2 format)
curl https://your-deployment.up.railway.app/v1/research?query=ethereum&type=bullbear
```

---

## How It Works

```
Agent → GET /v1/research?query=ethereum&type=bullbear
      ← 402 + PAYMENT-REQUIRED header (max $0.35)
Agent → pays via x402 (USDC on Base)
      ← { analysis: "...", sources: [...], type: "bullbear", query: "ethereum" }
```

Settlement: `$0.25` (Messari AI) + `$0.015` (gas) = `$0.265` per call.  
Cache hit on `/v1/morning`: settles `$0`.

---

## Architecture

```
src/
  api/                ← HTTP service (primary)
    server.ts         — Express + x402 payment middleware
    messari.ts        — getMorningBrief() via CoinGecko + BlockRun AI
    services/
      research.ts     — runResearch() via Messari AI + templates
    data/
      coingecko.ts    — free market data (trending, prices, movers)
      blockrun.ts     — AI synthesis, NVIDIA free + DeepSeek fallback
  bot/                ← personal Telegram interface (not open for external use)
    bot.ts
    commands/
  cache.ts            — shared in-memory TTL cache
  core/               — x402 payment client, budget tracker
  providers/          — Messari AI & data clients
  types/              — pricing constants, interfaces
```

The same business logic (`getMorningBrief`, `runResearch`) serves both the HTTP API and the personal Telegram interface.

---

## Setup

```bash
git clone https://github.com/khaphamdinh/messari-pro-bot.git
cd messari-pro-bot
npm install
cp .env.example .env
```

`.env` required variables:
```env
WALLET_PRIVATE_KEY=...         # pays Messari/BlockRun per API call
PROVIDER_WALLET_ADDRESS=...    # receives USDC from API consumers
SERVER_PORT=3000

# Enables Base Mainnet (without these: Base Sepolia testnet)
CDP_API_KEY_ID=...
CDP_API_KEY_SECRET=...
```

---

## Run

```bash
npm run start:server   # HTTP API only
npm run start:all      # HTTP API + Telegram bot
npm run dev            # development (hot reload)
```

**Server modes:**

| Mode | CDP keys | Network | Facilitator |
|------|----------|---------|-------------|
| Development | Not set | Base Sepolia | x402.org (public) |
| Production | Set | Base Mainnet | Coinbase CDP |

---

## Deploy

```bash
# railway.toml configured — connect repo in Railway dashboard
# Set env vars → deploy
git push origin main
```

---

## Tech Stack

- **Payment protocol**: x402, upto scheme, Base Mainnet USDC
- **HTTP server**: Express + `@x402/express` + `@coinbase/x402`
- **Morning data**: CoinGecko (free) + BlockRun AI (NVIDIA DeepSeek V3.2, $0/call)
- **Research data**: Messari AI v2 (`/ai/v2/chat/completions`, $0.25/call)
- **Shared infrastructure**: viem, TypeScript, Node.js 20
- **Deploy**: Railway

---

*The Telegram bot in `src/bot/` is a personal consumer of the same API logic — not open for external use.*
