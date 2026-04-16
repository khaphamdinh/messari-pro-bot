import { Context } from 'grammy';

export function handleStart(ctx: Context) {
  const msg = `
🎉 Welcome to Messari Pro AI Bot v2!

⚠️ SECURITY WARNING:
- Never share your private key or seed phrase via this chat.
- This bot will NEVER ask for it. Use a dedicated burner wallet.

🔑 PREREQUISITES:
- 💰 USDC on Base Mainnet (~$5+ recommended)
- ⛽ ETH on Base for gas fees

📡 AVAILABLE COMMANDS:
- /morning — 24h market brief ($0.25)
  - /report <type> <topic> — deep reports ($0.25)
  - /deepreport <asset> — composite report (~$1.00)
- /data <asset> — structured asset data ($0.10)
- /signals — mindshare gainers ($0.35)
- /news [asset] — curated news ($0.55)
- /unlocks <asset> — token unlock schedule ($0.15)
- /funding — latest funding rounds ($0.15)
- /balance — wallet balance
- /budget — daily spending tracker

💡 Or just type any crypto question to chat freely!
`;
  return ctx.reply(msg, { parse_mode: 'Markdown' });
}

export function handleHelp(ctx: Context) {
  const msg = `
📊 **USAGE EXAMPLES:**

1️⃣ **Freestyle Query** (Cost: $0.25):
Type any crypto question — "Analyze Bitcoin" or "Is ETH a buy now?"

2️⃣ **Morning Brief** (Cost: $0.25):
\`/morning\`

3️⃣ **Deep Reports** (Cost: $0.25):
\`/report <type> <topic>\`
Types: \`diligence\`, \`compare\`, \`bullbear\`, \`narrative\`, \`risk\`
Example: \`/report diligence Solana\`

4️⃣ **Composite Deep Report** (Cost: ~$0.70–1.25):
\`/deepreport <asset>\`
Example: \`/deepreport solana\`

5️⃣ **Structured Data** (Cost: $0.10):
\`/data <asset>\`
Example: \`/data bitcoin\`

6️⃣ **Signals & News:**
- \`/signals\` — mindshare gainers 24h ($0.35)
- \`/news [asset]\` — curated news feed ($0.55)

7️⃣ **Token Unlocks & Funding:**
- \`/unlocks <asset>\` ($0.15)
- \`/funding\` ($0.15)

8️⃣ **Account:**
- \`/balance\` — wallet USDC + ETH
- \`/budget\` — daily spend tracker
`;
  return ctx.reply(msg, { parse_mode: 'Markdown' });
}

export function handleStatus(ctx: Context) {
  const msg = `
🟢 **Messari Pro Bot v2 — Active**
- Network: **Base Mainnet (eip155:8453)**
- Payment: **USDC via x402 protocol**
- AI cost: **$0.25/request**
- Daily budget: configurable via DAILY_BUDGET_LIMIT env
`;
  return ctx.reply(msg, { parse_mode: 'Markdown' });
}
