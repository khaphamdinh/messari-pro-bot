# 🤖 Messari Pro AI Bot

An intelligent Bot powered by **Messari API** and **x402 Protocol (Base Network)**. This bot integrates real-time crypto intelligence with an autonomous payment processing layer. 

Designed for Crypto Degens, Analysts, & Builders who need a curated newsroom and deep-research capabilities delivered straight to their Telegram accounts.

## 📖 Table of Contents
- [✨ Features](#-features)
- [🏗️ Architecture Stack](#️-architecture-stack)
- [🚀 Quick Setup & Installation](#-quick-setup--installation)
- [🛠️ Customization (Build Your Own AI Newsroom)](#️-customization-build-your-own-ai-newsroom)
- [⚠️ Security Warning](#️-security-warning)

## ✨ Features

- **🌅 The Daily Alpha Brief (`/morning`)**: Have a coffee and get your daily alpha every day with Messari Pro AI Bot. It acts as your Editor-in-Chief by scraping the top 10-15 critical, market-moving events from the past 24 hours. The bot dedupes them and provides 2-3 sentence thesis summaries alongside verified source links.

- **📄 Deep Research Reports (`/report`)**: Build your own analytical reports on any token or narrative. Includes prompt templates for Due Diligence, Comparison showdowns, Bull/Bear cases, and Regulatory risk. You can seamlessly add more templates in `src/prompts.ts`.

- **💬 Freestyle Copilot**: Just type any query in standard chat mode. The bot will use Messari's AI to deliver deep analytical rigor, bypassing standard summary constraints.

- **💰 Autonomous Onchain Payments (`/balance`)**: Built on the **x402 EVM Standard**. The bot automatically pays $0.25 in USDC via the **Base Mainnet** for each AI request. No Messari account needed, no subscription API keys required. Just fund the bot's wallet! Only 25 cents, pay as you go!

## 🏗️ Architecture Stack

- **Framework**: `grammY` (Telegram Bot API)
- **Language**: TypeScript (Node.js 20)
- **Payment Layer**: `@x402/fetch` and `viem` (Base Mainnet)
- **Data Source**: Messari AI v2 endpoint (https://docs.messari.io/api-reference/x402-payments)

---

## 🚀 Quick Setup & Installation

### 1. Prerequisites
- **Node.js**: v20 or higher.
- **Telegram Bot Token**: Get one from [@BotFather](https://t.me/BotFather).
- **Burner Wallet**: A dedicated EVM private key funded with **USDC** and **ETH (Gas)** on the **Base Mainnet**. _(Never use your personal main wallet!)_

### 2. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/khaphamdinh/messari-pro-bot.git
cd messari-pro-bot
npm install
```

### 3. Environment Variables
Copy the template and fill in your credentials:
```bash
cp .env.example .env
```
Ensure your `.env` contains:
```env
TELEGRAM_BOT_TOKEN="your_telegram_bot_token"
WALLET_PRIVATE_KEY="0x_your_burner_wallet_private_key"
```

### 4. Run the Bot
Start the bot in development mode with **Hot Reload** enabled:
```bash
npm run dev
```
For production deployment using PM2 (background process manager):
```bash
npm install -g pm2
npm run build
pm2 start "npm start" --name "messari-pro-bot"
```

---

## 🛠️ Customization (Build Your Own AI Newsroom)

The true power of this bot lies in its heavily engineered **System Prompts**. 

I have added some example prompts to get you started, but you can completely alter the bot's tone, focus, and analytical depth.

1. Open the file `src/prompts.ts`.
2. In this file, you will find the `REPORT_TEMPLATES` object. Want your `/morning` summary to speak like a decentralized finance degen? Or maybe you want a new `/chart` research template?
3. Customize the prompts to your liking.

**Pro Tip:** Keep your prompts strictly structured to ensure the AI parses Messari data accurately. The AI relies entirely on the quality of the prompt you feed into `src/prompts.ts`!

---

## ⚠️ Security Warning

- **DO NOT** commit your `.env` file to GitHub. The `.gitignore` is set up to protect it, but always double-check before pushing.
- **DO NOT** fund the bot's wallet with large amounts of capital. Treat it like a prepaid metro card.
- Open-sourcing tools with private keys is inherently risky if best practices are ignored. You bear full responsibility for your wallet's security.

---
*Built with ❤️ for the Crypto x AI Ecosystem.*
