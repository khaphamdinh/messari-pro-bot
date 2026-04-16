import { Context } from 'grammy';
import { createPublicClient, http, formatEther, formatUnits, parseAbi } from 'viem';
import { base } from 'viem/chains';
import { walletAddress } from '../core/x402Client';

const publicClient = createPublicClient({
  chain: base,
  transport: http('https://mainnet.base.org'),
});

const USDC_ADDRESS = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913';
const ERC20_ABI = parseAbi([
  'function balanceOf(address owner) view returns (uint256)',
]);

async function checkWalletBalance() {
  try {
    const ethBalanceWei = await publicClient.getBalance({ address: walletAddress });
    const ethBalanceStr = formatEther(ethBalanceWei);

    const usdcBalanceWei = await publicClient.readContract({
      address: USDC_ADDRESS,
      abi: ERC20_ABI,
      functionName: 'balanceOf',
      args: [walletAddress],
    });
    const usdcBalanceStr = formatUnits(usdcBalanceWei as bigint, 6);

    return {
      address: walletAddress,
      eth: Number(ethBalanceStr).toFixed(4),
      usdc: Number(usdcBalanceStr).toFixed(2),
    };
  } catch (err: any) {
    console.error('Balance check error:', err.message);
    throw new Error('❌ Error querying blockchain. Please try again later.');
  }
}

export async function handleBalance(ctx: Context) {
  const pending = await ctx.reply('⏳ Reading wallet data from Base blockchain...');
  try {
    const balance = await checkWalletBalance();
    const msg = `
💸 **WALLET BALANCE (BASE MAINNET)** 💸

🏦 **Bot Address:**
\`${balance.address}\`

💵 **Available:**
- **USDC:** ${balance.usdc} $ (AI Call Fee: $0.25/request)
- **ETH:** ${balance.eth} ETH (For Gas Fees)

*Note: If USDC < $0.25 or ETH is depleted, the bot cannot pay.*
`;
    await ctx.api.editMessageText(ctx.chat!.id, pending.message_id, msg, { parse_mode: 'Markdown' });
  } catch (err: any) {
    await ctx.api.editMessageText(ctx.chat!.id, pending.message_id, err.message);
  }
}
