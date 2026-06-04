# messari-pro-bot — Upgrade Instructions

## Context

This is a Telegram bot (`grammY` + TypeScript) that calls Messari AI API via x402 protocol for crypto research.
The bot currently works fine. Do NOT break existing functionality.

**Current flow:** User sends Telegram message → bot calls `POST /ai/v2/chat/completions` (Messari AI, $0.10/call) → replies to user.

**Goal of this upgrade:** Add two things on top of existing bot:
1. In-memory cache for `/morning` command (saves 80-90% cost)
2. A separate Express HTTP server that exposes bot's intelligence as a paid x402 API endpoint (for listing on Agentic.Market)

---

## What We Know About Pricing (Already Researched)

Messari x402 actual prices (verified via HTTP 402 headers):

| Endpoint | Price |
|---|---|
| `POST /ai/v2/chat/completions` | **$0.10** — cheapest comprehensive Messari option |
| `GET /news/v1/news/feed` | $0.55 — expensive, avoid for now |
| `GET /signal/v1/assets/mindshare-gainers-24h` | $0.35 — expensive, avoid for now |
| `GET /funding/v1/rounds` | $0.15 |
| `GET /metrics/v2/assets/details` | $0.10 |
| `GET /metrics/v2/assets` | **FREE** (returns HTTP 200 without payment) |

**Decision:** Keep using Messari AI ($0.10) for all synthesis. Do NOT replace with individual data endpoints — they cost more. Do NOT add BlockRun or CoinGecko for now.

---

## Tasks — Execute in Order

### TASK 1: Install new dependencies

```bash
npm install @x402/express @x402/evm @x402/core concurrently
```

---

### TASK 2: Read existing src/index.ts first

Before writing anything, read `src/index.ts` to understand:
- How `fetchWithPayment` is initialized (what variable name, what import)
- How the Messari AI call is made (what function, what URL, what body)
- Where bot commands are defined

This is critical — we need to reuse the exact same fetch wrapper in the new server.

---

### TASK 3: Create src/cache.ts (NEW FILE)

```typescript
// src/cache.ts
interface Entry<T> { value: T; exp: number; }

const store = new Map<string, Entry<any>>();

export function cacheGet<T>(key: string): T | null {
  const entry = store.get(key);
  if (!entry || Date.now() > entry.exp) {
    store.delete(key);
    return null;
  }
  return entry.value as T;
}

export function cacheSet<T>(key: string, value: T, ttlMs: number): void {
  store.set(key, { value, exp: Date.now() + ttlMs });
}

export const TTL = {
  MORNING: 90 * 60_000,   // 90 minutes
};

export function hourBucket(): string {
  return new Date().toISOString().slice(0, 13); // "2026-06-01T10"
}
```

---

### TASK 4: Modify src/index.ts — add cache to /morning command

Find the `/morning` command handler. Wrap it with cache logic:

```typescript
// ADD these imports at top of file (alongside existing imports):
import { cacheGet, cacheSet, TTL, hourBucket } from './cache';

// FIND the bot.command("morning", ...) handler
// WRAP the Messari call with cache like this:

bot.command("morning", async (ctx) => {
  const key = `morning:${hourBucket()}`;
  
  const cached = cacheGet<string>(key);
  if (cached) {
    return ctx.reply(cached); // cache hit: $0.00 cost
  }

  // ... keep ALL existing Messari AI call code exactly as-is ...
  // After getting the result (whatever variable it's in, e.g. `result` or `text`):
  
  cacheSet(key, result, TTL.MORNING);
  ctx.reply(result);
});
```

**Important:** Do not change how the Messari call itself works. Only add the cache wrapper around it.

---

### TASK 5: Create src/messari.ts — extract Messari AI call into shared function

Look at how the Messari AI call is made in `src/index.ts`. Extract it into a reusable function so both the Telegram bot and the new HTTP server can use it.

Create `src/messari.ts` with a function like:

```typescript
// src/messari.ts
// Export a function that calls Messari AI and returns the text response
// Use the same fetchWithPayment setup that already exists in the project
// Function signature should be something like:
export async function callMessariAI(userMessage: string): Promise<string>
// OR if there's a morning-specific function:
export async function getMorningBrief(): Promise<string>
```

The exact implementation depends on what's in `src/index.ts` — extract it cleanly without duplicating code.

Update `src/index.ts` to import and use this shared function.

---

### TASK 6: Create src/server.ts (NEW FILE — x402 HTTP server)

```typescript
// src/server.ts
import express from 'express';
import { paymentMiddleware, setSettlementOverrides, x402ResourceServer } from '@x402/express';
import { UptoEvmScheme } from '@x402/evm/upto/server';
import { HTTPFacilitatorClient } from '@x402/core/server';
import { cacheGet, cacheSet, TTL, hourBucket } from './cache';
import { getMorningBrief } from './messari'; // or whatever function name from Task 5

const app = express();

const PROVIDER_WALLET = process.env.PROVIDER_WALLET_ADDRESS;
if (!PROVIDER_WALLET) throw new Error('PROVIDER_WALLET_ADDRESS not set in .env');

const facilitator = new HTTPFacilitatorClient({
  url: 'https://api.cdp.coinbase.com/platform/v2/x402',
});

const server = new x402ResourceServer(facilitator)
  .register('eip155:8453', new UptoEvmScheme());

app.use(
  paymentMiddleware(
    {
      'GET /v1/morning': {
        accepts: [{
          scheme: 'upto',
          price: '$0.17',           // max user pays
          network: 'eip155:8453',   // Base Mainnet
          payTo: PROVIDER_WALLET,
        }],
        description: 'Daily crypto alpha brief: market overview, top movers, key events. Powered by Messari AI.',
        mimeType: 'application/json',
      },
    },
    server
  )
);

app.get('/v1/morning', async (req, res) => {
  try {
    const key = `morning:${hourBucket()}`;
    const cached = cacheGet<string>(key);

    if (cached) {
      // Cache hit: settle $0 — buyer pays nothing for cached response
      setSettlementOverrides(res, { amount: '0' });
      return res.json({ brief: cached, cached: true });
    }

    // Cache miss: call Messari AI ($0.10) + gas ($0.015) = $0.115 cost
    const brief = await getMorningBrief();

    // Settle actual cost in USDC atomic units (6 decimals)
    // $0.115 * 1,000,000 = 115,000 atomic units
    const actualCostAtomic = 115_000;
    setSettlementOverrides(res, { amount: String(actualCostAtomic) });

    cacheSet(key, brief, TTL.MORNING);
    res.json({ brief, cached: false });

  } catch (err: any) {
    console.error('Server error:', err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = parseInt(process.env.SERVER_PORT ?? '3000');
app.listen(PORT, () => {
  console.log(`x402 server running on port ${PORT}`);
});
```

---

### TASK 7: Update .env (ADD new variables, keep existing ones)

Add to `.env`:
```
PROVIDER_WALLET_ADDRESS=0x_YOUR_RECEIVING_WALLET_ADDRESS
SERVER_PORT=3000
```

**Note for user:** `PROVIDER_WALLET_ADDRESS` is where you RECEIVE payments from users. It can be a different address from `WALLET_PRIVATE_KEY` (which pays Messari). Keep them separate.

Update `.env.example` with the same new keys (no real values).

---

### TASK 8: Update package.json scripts

Add these scripts:

```json
{
  "scripts": {
    "dev": "existing script — DO NOT CHANGE",
    "build": "existing script — DO NOT CHANGE",
    "start": "existing script — DO NOT CHANGE",
    "start:server": "node dist/server.js",
    "start:all": "concurrently \"npm run dev\" \"node dist/server.js\""
  }
}
```

---

### TASK 9: Verify tsconfig.json includes new files

Check that `tsconfig.json` will compile `src/cache.ts`, `src/messari.ts`, and `src/server.ts`. It should automatically if `include` is set to `src/**/*` or similar. If not, fix it.

---

### TASK 10: Run a quick sanity check

```bash
npm run build
```

Fix any TypeScript errors. Then:

```bash
# Start both in separate terminals to verify
npm run dev         # Telegram bot — should work exactly as before
npm run start:server  # x402 server — should start on port 3000
```

Test the server responds with 402:
```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/v1/morning
# Should return: 402
```

---

## What NOT to Do

- Do NOT refactor the existing Messari call logic — only extract it
- Do NOT add BlockRun, CoinGecko, or any new data sources
- Do NOT change how the Telegram bot handles `/report` or freestyle chat
- Do NOT modify the x402 payment setup for the bot's BUYER wallet
- Do NOT add any new Telegram commands beyond cache for `/morning`

---

## File Summary

After completion, new/modified files:

```
src/
  cache.ts          ← NEW
  messari.ts        ← NEW (extracted from index.ts)
  server.ts         ← NEW
  index.ts          ← MODIFIED (add cache to /morning, import from messari.ts)
.env                ← MODIFIED (add PROVIDER_WALLET_ADDRESS, SERVER_PORT)
.env.example        ← MODIFIED (add new keys)
package.json        ← MODIFIED (add scripts + deps)
```

---

## After This Is Done

1. Deploy to Railway (connect GitHub repo, add env vars in Railway dashboard)
2. Get public URL from Railway (e.g. `https://messari-pro-bot.railway.app`)
3. Go to `agentic.market/validate/setup/endpoint` and fill in:
   - HTTP Method: GET
   - Path: `https://messari-pro-bot.railway.app/v1/morning`
   - Description: Daily crypto alpha brief powered by Messari AI
   - Price: $0.17
   - Network: Base Mainnet
   - PayTo: your `PROVIDER_WALLET_ADDRESS`
