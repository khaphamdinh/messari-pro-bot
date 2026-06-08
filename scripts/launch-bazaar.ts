/**
 * Run once to trigger CDP Bazaar indexing for a new deployment.
 * Makes a real paid request to the live server using the bot's spending wallet.
 *
 * Run: npx ts-node scripts/launch-bazaar.ts
 * Env: SERVER_URL (defaults to Railway prod URL if not set)
 */

import 'dotenv/config';
import { wrapFetchWithPaymentFromConfig } from '@x402/fetch';
import { ExactEvmScheme } from '@x402/evm';
import { privateKeyToAccount } from 'viem/accounts';

const SERVER = process.env.SERVER_URL ?? 'https://x402-research.up.railway.app';

async function main() {
  const rawPk = process.env.WALLET_PRIVATE_KEY;
  if (!rawPk) throw new Error('WALLET_PRIVATE_KEY not set');
  const pk = (rawPk.startsWith('0x') ? rawPk : `0x${rawPk}`) as `0x${string}`;

  const account = privateKeyToAccount(pk);
  console.log(`Buyer wallet: ${account.address}`);
  console.log(`Target server: ${SERVER}`);

  const fetchWithPayment = wrapFetchWithPaymentFromConfig(fetch, {
    schemes: [{
      network: 'eip155:8453',
      client: new ExactEvmScheme(account),
    }],
  });

  // Try /v1/morning first, fallback to /v1/research if BlockRun is down
  let res = await fetchWithPayment(`${SERVER}/v1/morning`);
  let endpoint = '/v1/morning';

  if (res.status === 500) {
    console.log('Morning failed (upstream error), trying /v1/research...');
    res = await fetchWithPayment(`${SERVER}/v1/research?query=bitcoin&type=bullbear`);
    endpoint = '/v1/research';
  }

  const data = await res.json();
  console.log(`\nEndpoint: ${endpoint}`);
  console.log(`Status: ${res.status}`);
  if (res.status === 200) {
    const content = data.brief ?? data.analysis ?? JSON.stringify(data).slice(0, 200);
    console.log(`Response (200 chars): ${String(content).slice(0, 200)}`);
    console.log('\n✓ Payment settled — endpoint should be indexed in Bazaar shortly.');
  } else {
    console.log('Response:', JSON.stringify(data).slice(0, 300));
    console.log('\n✗ Payment did not go through.');
  }
}

main().catch(console.error);
