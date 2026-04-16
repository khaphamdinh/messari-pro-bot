# 🤖 Crypto Intelligence Bot v1.1

A professional-grade AI research agent powered by the **Messari Engine** and **x402 (Base Network)**. This agent synthesizes real-time on-chain data, curated news, and institutional-grade metrics into structured research reports.

> **Thesis**: The next million users in crypto will be AI Agents. This bot is a live implementation of agentic commerce using on-chain payment rails.

## 🚀 Key Features

### 📄 Specialized Research Reports (`/report`)
Generate expert-level analysis using a **Modular Prompt Engine**. This feature supports:
- **Template-driven Analysis**: Pre-built logic for Due Diligence, Bull/Bear cases, Comparison showdowns, and Risk assessments.

### 🔬 Composite Deep Research (`/deepreport`)
A high-leverage data synthesis engine for heavy-duty research (~$1.00 cost) with data aggregation: Simultaneously fetches `asset-details` (Market Cap, Supply), `roi` (Performance history), and `news-feed` (Curated news snippets/Why does this matter?).

### 💰 Autonomous x402 Payments
- **Agentic Wallet**: The bot operates its own burner wallet on the **Base Mainnet**.
- **Pay-per-Query**: Pays between $0.25 (AI chat) and $1.00 (Deep Data) in USDC per request. No monthly subscriptions or shared API keys required.

## 🛠️ Quick Start (Works out of the box)

If you just want the bot to run immediately with standard AI intelligence:

```bash
# 1. Clone and Install
git clone https://github.com/khaphamdinh/messari-pro-bot.git
cd messari-pro-bot
npm install

# 2. Configure Credentials (.env)
cp .env.example .env 
# ⚠️ CRITICAL: Fill in TELEGRAM_BOT_TOKEN and WALLET_PRIVATE_KEY. Use a NEW wallet only. Never expose your primary keys.

# 3. Launch
npm run dev
```

---

## 🧠 Pro Customization (Master Analyst Mode)

To unlock the full potential of the bot and mimic elite research firms, you need to customize its brain.

### 1. Refine the Brain (`src/prompts.ts`)
The "Intelligence" of the bot is stored in `src/prompts.ts`. 
- Open this file.
- Edit the `REPORT_TEMPLATES` object to change how the bot thinks, its tone, and analytical depth.

### 2. Activate Style Cloning (`src/samples/`)
The bot can "clone" the writing style of any high-end report you give it.
- **Step A:** Find a high-quality PDF report (e.g., from Messari or your own analytical writings).
- **Step B:** Convert that PDF to a `.md` (Markdown) file.
- **Step C:** Save it in the `src/samples/` directory with a filename matching your command (e.g., `diligence.md`, `compare.md`).
- **Result:** The bot will automatically detect it and "inject" that specific markdown into its AI context to clone the exact formatting, vocabulary, and structure!

## 🔌 Commands

- `/morning` - Daily curated alpha brief.
- `/report <type> <topic>` - Specialized reports (`diligence`, `compare`, `bullbear`, `narrative`, `risk`).
- `/deepreport <asset>` - Composite data synthesis (~$1.00 cost).
- `/balance` - Check your x402 burner wallet balance on Base.

## 🏗️ Tech Stack

- **Payment Layer**: x402 Protocol (USDC on Base Mainnet).
- **Core Engine**: TypeScript, Node.js, grammY.
- **Data Source**: Messari AI v2 API.

---
*Built for the Agentic Economy. Handle with care.*
