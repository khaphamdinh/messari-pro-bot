# Messari Pro Bot — Crypto Intelligence × x402

A dual-mode crypto intelligence service: a Telegram research bot for personal use and a pay-per-request HTTP API listed on [Agentic.Market](https://agentic.market).

Payments are handled entirely via the **x402 protocol** (USDC on Base Mainnet) — no API keys, no subscriptions.

---

## Architecture

```
┌─────────────────────────────────────────┐
│           services/ layer               │
│  getMorningBrief()  runResearch()       │
└────────────┬───────────────┬────────────┘
             │               │
     src/bot.ts         src/server.ts
   (Telegram UI)       (x402 HTTP API)
```

Same business logic, two consumers — Telegram for human use, HTTP for agents.

---

## HTTP Endpoints (Agentic.Market)

| Endpoint | Price | Description |
|----------|-------|-------------|
| `GET /v1/morning` | $0.07 max | Daily crypto alpha brief. CoinGecko data + BlockRun AI synthesis. Cached 90 min — cache hits settle $0. |
| `GET /v1/research?query=&type=` | $0.35 max | On-demand research powered by Messari AI. Types: `diligence` `bullbear` `compare` `narrative` `risk` `tweet` |

Both endpoints use the **upto scheme** — agents authorize a maximum, server settles actual cost.

**Try it:**
```bash
curl -s https://your-deployment.up.railway.app/v1/morning
# → HTTP 402 with PAYMENT-REQUIRED header (x402v2 format)
```

---

## Telegram Bot Commands

| Command | Data Source | Cost |
|---------|-------------|------|
| `/morning` | CoinGecko (free) + BlockRun AI | ~$0.001 |
| `/report <type> <topic>` | Messari AI | $0.25 |
| `/deepreport <asset>` | Messari multi-endpoint + AI | ~$1.00 max |
| `/data <asset>` | Messari metrics | $0.10 |
| `/signals` | Messari mindshare | $0.35 |
| `/news [asset]` | Messari news feed | $0.55 |
| `/unlocks <asset>` | Messari token unlocks | $0.15 |
| `/funding` | Messari funding rounds | $0.15 |
| `/balance` | Base blockchain RPC | Free |
| `/budget` | In-memory tracker | Free |

---

## Setup

### Prerequisites
- Node.js 20+
- Telegram Bot Token ([@BotFather](https://t.me/BotFather))
- Burner wallet with USDC + ETH on Base Mainnet
- (Optional) [Coinbase CDP API key](https://portal.cdp.coinbase.com) for mainnet HTTP server

### Install

```bash
git clone https://github.com/khaphamdinh/messari-pro-bot.git
cd messari-pro-bot
npm install
cp .env.example .env
```

Edit `.env`:
```env
TELEGRAM_BOT_TOKEN=...
WALLET_PRIVATE_KEY=...        # pays Messari/BlockRun per call
PROVIDER_WALLET_ADDRESS=...   # receives USDC from API consumers
DAILY_BUDGET_LIMIT=5.00
SERVER_PORT=3000

# Optional — enables Base Mainnet for HTTP server
CDP_API_KEY_ID=...
CDP_API_KEY_SECRET=...
```

### Run

```bash
# Telegram bot only
npm run dev

# HTTP server only
npm run start:server

# Both together (production)
npm run start:all
```

### HTTP Server Modes

| Mode | Condition | Network | Facilitator |
|------|-----------|---------|-------------|
| Development | No CDP keys | Base Sepolia (testnet) | x402.org (public) |
| Production | CDP keys set | Base Mainnet | Coinbase CDP |

---

## Deploy (Railway)

```bash
# railway.toml already configured
# Set env vars in Railway dashboard, then:
git push origin main  # auto-deploys
```

---

## Prompts & Style Cloning

The AI behavior is defined in `src/prompts.ts` (gitignored — create from example):

```bash
cp src/prompts.example.ts src/prompts.ts
```

Drop `.md` sample reports into `src/samples/` (e.g. `diligence.md`) — the bot will clone their writing style automatically.

---

## Tech Stack

- **Payment**: x402 protocol, upto + exact schemes, Base Mainnet
- **Bot**: grammY (Telegram), TypeScript, Node.js 20
- **HTTP Server**: Express + `@x402/express`
- **Morning data**: CoinGecko API (free) + BlockRun AI (NVIDIA DeepSeek V3.2)
- **Research data**: Messari AI v2 (`/ai/v2/chat/completions`)
- **Deploy**: Railway

---

*Built for the agentic economy — where AI agents pay other AI agents.*
