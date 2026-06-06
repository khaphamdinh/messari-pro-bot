/**
 * Run once to trigger CDP Bazaar indexing.
 * Makes a real paid request to the live server using the bot's spending wallet.
 *
 * Run: npx ts-node test/launch-bazaar.ts
 */

import 'dotenv/config';
import { wrapFetchWithPaymentFromConfig } from '@x402/fetch';
import { ExactEvmScheme } from '@x402/evm';
import { privateKeyToAccount } from 'viem/accounts';

const SERVER = 'https://x402-research.up.railway.app';

async function main() {
  const rawPk = process.env.WALLET_PRIVATE_KEY;
  if (!rawPk) throw new Error('WALLET_PRIVATE_KEY not set');
  const pk = (rawPk.startsWith('0x') ? rawPk : `0x${rawPk}`) as `0x${string}`;

  const account = privateKeyToAccount(pk);
  console.log(`Buyer wallet: ${account.address}`);

  const fetchWithPayment = wrapFetchWithPaymentFromConfig(fetch, {
    schemes: [{
      network: 'eip155:8453',
      client: new ExactEvmScheme(account),
    }],
  });

  console.log('\nCalling /v1/morning with real payment...');
  const res = await fetchWithPayment(`${SERVER}/v1/morning`);
  const data = await res.json();

  console.log(`Status: ${res.status}`);
  console.log(`Cached: ${data.cached}`);
  console.log(`Brief (200 chars): ${String(data.brief ?? data.error).slice(0, 200)}`);
  console.log('\nDone — endpoint should now be indexed in Bazaar.');
}

main().catch(console.error);
