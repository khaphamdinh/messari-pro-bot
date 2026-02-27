import { wrapFetchWithPaymentFromConfig } from '@x402/fetch';
import { ExactEvmScheme } from '@x402/evm';
import { privateKeyToAccount } from 'viem/accounts';
import { createPublicClient, http, formatEther, formatUnits, parseAbi } from 'viem';
import { base } from 'viem/chains';
import { config } from './config';

// 1. Setup EVM Account securely from viem
const account = privateKeyToAccount(config.WALLET_PRIVATE_KEY);
console.log(`[x402] Loaded wallet: ${account.address}`);

// 2. Setup Base mainnet network ID & Schema exactly as Messari Docs require
const client = new ExactEvmScheme(account);

export const fetchWithPayment = wrapFetchWithPaymentFromConfig(fetch, {
    schemes: [
        {
            network: 'eip155:8453', // Base Mainnet
            client,
        },
    ],
});

// Setup Public Client for querying balance
const publicClient = createPublicClient({
    chain: base,
    transport: http('https://mainnet.base.org')
});

const USDC_ADDRESS = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913';
const ERC20_ABI = parseAbi([
    'function balanceOf(address owner) view returns (uint256)'
]);

export async function checkWalletBalance() {
    const address = account.address;

    try {
        const ethBalanceWei = await publicClient.getBalance({ address });
        const ethBalanceStr = formatEther(ethBalanceWei);

        const usdcBalanceWei = await publicClient.readContract({
            address: USDC_ADDRESS,
            abi: ERC20_ABI,
            functionName: 'balanceOf',
            args: [address]
        });
        // USDC has 6 decimals on Base
        const usdcBalanceStr = formatUnits(usdcBalanceWei as bigint, 6);

        return {
            address,
            eth: Number(ethBalanceStr).toFixed(4),
            usdc: Number(usdcBalanceStr).toFixed(2)
        };
    } catch (error: any) {
        console.error("Balance check error:", error.message);
        throw new Error("❌ Error occurred while querying data from the blockchain. Please try again later.");
    }
}

export interface AiResponse {
    text: string;
    sources: Array<{ domain: string, title: string, url: string }>;
}

export async function askMessariAI(promptContext: string): Promise<AiResponse> {
    // Call AI Endpoint as defined in prompt
    const url = 'https://api.messari.io/ai/v2/chat/completions';

    const payload = {
        messages: [
            { role: "user", content: promptContext }
        ],
        response_format: "markdown",
        stream: false
    };

    try {
        const rawResponse = await fetchWithPayment(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });

        if (!rawResponse.ok) {
            if (rawResponse.status === 402) {
                throw new Error('STATUS_402_INSUFFICIENT_FUNDS');
            }
            const errorBody = await rawResponse.text();
            throw new Error(`Messari API Error: ${rawResponse.statusText} (${rawResponse.status}) - Details: ${errorBody}`);
        }

        const json = await rawResponse.json();

        const text = json?.data?.messages?.[0]?.content ||
            json?.choices?.[0]?.message?.content ||
            "Did not receive a text response from Messari. Please try again.";

        const sources = json?.metadata?.sources || json?.data?.metadata?.sources || [];

        return { text, sources };

    } catch (err: any) {
        if (err.message === 'STATUS_402_INSUFFICIENT_FUNDS' || err.message.includes('402')) {
            throw new Error("PAYMENT ERROR:\nYour wallet does not have enough USDC or ETH gas on the Base network to execute this call. The fee is $0.25/request. Please top up and try again.");
        }
        throw err;
    }
}
