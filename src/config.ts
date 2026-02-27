require('dotenv').config();

const requiredEnvVars = [
    'TELEGRAM_BOT_TOKEN',
    'WALLET_PRIVATE_KEY'
];

for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
        console.error(`Missing required environment variable: ${envVar}`);
        process.exit(1);
    }
}

let walletPk = process.env.WALLET_PRIVATE_KEY!;
// Ensure 0x prefix is there for Viem
if (!walletPk.startsWith('0x')) {
    walletPk = '0x' + walletPk;
}

export const config = {
    TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN!,
    WALLET_PRIVATE_KEY: walletPk as `0x${string}`
};
