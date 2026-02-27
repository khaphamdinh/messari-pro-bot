import { Bot } from "grammy";
import { config } from "./config";
import { askMessariAI, checkWalletBalance } from "./messariClient";
import { getPromptTemplate } from "./prompts";
import { formatResponse } from "./format";

// Init Bot
const bot = new Bot(config.TELEGRAM_BOT_TOKEN);

// Define interactive menu commands
bot.api.setMyCommands([
  { command: "start", description: "🚀 Show startup instructions" },
  { command: "morning", description: "🌅 Quick 24h market & news brief" },
  { command: "help", description: "📖 View usage examples" },
  { command: "report", description: "📄 Run in-depth reports (diligence, compare,...)" },
  { command: "balance", description: "💰 Check available balance on Base wallet" },
  { command: "status", description: "🟢 Check Bot status" }
]).catch(err => console.error("Failed to set command menu:", err));

// Start Command Onboarding
bot.command("start", (ctx) => {
  const onboardingMsg = `
🎉 Welcome to Messari Pro AI Bot!

⚠️ SECURITY WARNING:
- Never share your private key or seed phrase via this chat. 
- This bot will NEVER ask for it. You should only use a dedicated burner test wallet.

🔑 PREREQUISITES:
To use this bot, your programmed wallet requires:
- 💰 USDC on **Base Mainnet** (~$1+ recommended)
- ⛽ A small amount of ETH on Base for gas fees.

💡 To query, simply type your crypto questions here!
`;
  return ctx.reply(onboardingMsg, { parse_mode: "Markdown" });
});

// Help Command
bot.command("help", (ctx) => {
  const helpMsg = `
📊 **USAGE EXAMPLES:**

1️⃣ **Direct Query / Freestyle** (Cost: $0.25):
Just type any crypto questions to chat freely!
"Analyze Bitcoin comprehensively" or "Có nên mua ETH bây giờ không?"

2️⃣ **Morning Brief / News Update** (Cost: $0.25):
Type /morning to get a dynamic summary of top news & curated sources from Messari!

3️⃣ **Deep Research Reports** (Cost: $0.25):
Type /report <type> <query>

Available types:
- \`diligence\` : Comprehensive Due Diligence
- \`compare\` : In-Depth Comparison (e.g., Solana vs Ethereum)
- \`bullbear\` : Bull, Bear & Balanced Case
- \`narrative\` : Sector/Narrative Brief
- \`risk\` : Deep Risk & Regulation Report

Example: \`/report diligence Solana\`

3️⃣ **Check Status & Balance**:
Type /status or /balance to verify your available funds on Base.
  `;
  return ctx.reply(helpMsg, { parse_mode: "Markdown" });
});

// Status Command
bot.command("status", (ctx) => {
  // Can be expanded to read actual wallet balance using viem
  const statusMsg = `
🟢 **Bot is Active**
- Target Network: **Base Mainnet (eip155:8453)**
- Cost per AI call: **$0.25 USDC**
`;
  return ctx.reply(statusMsg, { parse_mode: "Markdown" });
});

// Balance Command
bot.command("balance", async (ctx) => {
  const pendingMsg = await ctx.reply("⏳ Reading wallet data from Base blockchain...");
  try {
    const balance = await checkWalletBalance();
    let balanceMsg = `
💸 **WALLET BALANCE (BASE MAINNET)** 💸

🏦 **Bot Address:**
\`${balance.address}\`

💵 **Available:**
- **USDC:** ${balance.usdc} $ (AI Call Fee: $0.25/request)
- **ETH:** ${balance.eth} ETH (For Gas Fees)

*Note: If USDC < $0.25 or ETH is depleted, the Bot cannot pay Messari.*
`;
    await ctx.api.editMessageText(ctx.chat.id, pendingMsg.message_id, balanceMsg, { parse_mode: "Markdown" });
  } catch (error: any) {
    await ctx.api.editMessageText(ctx.chat.id, pendingMsg.message_id, error.message);
  }
});

// Morning Brief Command
bot.command("morning", async (ctx) => {
  await processQuery(ctx, "morning", ""); // Empty query as the prompt context describes everything
});

// Report command (loads from prompts library)
bot.command("report", async (ctx) => {
  // Command typically looks like: /report diligence Solana
  const match = ctx.message?.text?.match(/^\/report\s+(\w+)\s+(.*)/i);

  if (!match) {
    const errorMsg = `❌ Syntax error. Please try: \`/report <type> <topic>\`
Supported types: diligence, compare, bullbear, narrative, risk`;
    return ctx.reply(errorMsg, { parse_mode: "Markdown" });
  }

  const [, templateType, query] = match;
  await processQuery(ctx, templateType, query);
});

// Fallback message handler (Direct text mapping to Smart Fallback)
bot.on("message:text", async (ctx) => {
  const query = ctx.message.text;

  // Ignore commands if they somehow fall through
  if (query.startsWith("/")) return;

  await processQuery(ctx, "fallback", query);
});

// Logic wrapper to handle Telegram waiting time + API Request
async function processQuery(ctx: any, templateType: string, query: string) {
  // Prepare full prompt context based on type
  const constructedPrompt = getPromptTemplate(templateType, query);

  // Send initial pending message (wait time ~30s)
  const pendingMsg = await ctx.reply("⏳ Connecting to Messari AI via Base network... (Blockchain payment confirmation may take ~30s - 60s, please wait.)");

  try {
    // 1. Call AI (will automatically negotiate payment via SDK)
    const aiResponse = await askMessariAI(constructedPrompt);

    // 2. Format footer with Extracted Links and Cost
    const finalReply = formatResponse(aiResponse.text, aiResponse.sources, 0.25);

    // 3. Handle Telegram message limit (4096 chars) & Markdown parse errors
    const CHUNK_SIZE = 4000;
    const chunks: string[] = [];
    for (let i = 0; i < finalReply.length; i += CHUNK_SIZE) {
      chunks.push(finalReply.substring(i, i + CHUNK_SIZE));
    }

    // Edit the pending message with the first chunk
    try {
      await ctx.api.editMessageText(ctx.chat.id, pendingMsg.message_id, chunks[0], { parse_mode: "Markdown" });
    } catch (parseErr) {
      // Fallback: If AI generates invalid markdown, send as plain text
      await ctx.api.editMessageText(ctx.chat.id, pendingMsg.message_id, chunks[0]);
    }

    // Send remaining chunks as new consecutive messages
    for (let i = 1; i < chunks.length; i++) {
      try {
        await ctx.reply(chunks[i], { parse_mode: "Markdown" });
      } catch (parseErr) {
        // Fallback for subsequent chunks
        await ctx.reply(chunks[i]);
      }
    }

  } catch (error: any) {
    console.error("Error:", error.message);

    let errorHelp = error.message;

    // Handle Messari unsupported networks, timeouts, etc based on docs
    if (errorHelp.includes("timeout") || errorHelp.includes("fetch failed")) {
      errorHelp = "❌ Request Timeout: No response received. Payment verification is slow. Please check Basescan in a few minutes.";
    } else if (errorHelp.includes("network")) {
      errorHelp = "❌ Network Error: Protocol requires Base mainnet (eip155:8453). Please check RPC connection.";
    }

    await ctx.api.editMessageText(ctx.chat.id, pendingMsg.message_id, `STATUS: ${errorHelp} `);
  }
}

// Global default error handler for grammY pipeline
bot.catch((err) => {
  console.error("Bot global error thrown:", err);
});

// Start listening
bot.start();
console.log("🚀 LFG! Bot is running...");
