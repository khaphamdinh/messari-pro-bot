import { wrapFetchWithPaymentFromConfig } from '@x402/fetch';
import { ExactEvmScheme } from '@x402/evm';
// FUTURE RAIL: import { UptoEvmScheme } from '@x402/evm/upto/client';
// When @x402/evm package supports upto client export, uncomment above
import { privateKeyToAccount } from 'viem/accounts';
import { config } from '../config';

const account = privateKeyToAccount(config.WALLET_PRIVATE_KEY);

export const walletAddress = account.address;

const exactScheme = new ExactEvmScheme(account);

export const fetchWithPayment = wrapFetchWithPaymentFromConfig(fetch, {
  schemes: [
    {
      network: 'eip155:8453', // Base Mainnet
      client: exactScheme,
    },
    // FUTURE RAIL: Uncomment when upto support is needed
    // {
    //   network: 'eip155:8453',
    //   client: new UptoEvmScheme(account),
    // },
  ],
});

console.log(`[x402] Wallet loaded: ${account.address}`);
