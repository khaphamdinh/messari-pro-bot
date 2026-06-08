/**
 * Testnet payment test — Base Sepolia (eip155:84532)
 *
 * Requires: test USDC on Base Sepolia at your wallet address
 * Faucet:   https://faucet.circle.com → Base Sepolia → paste your address
 *
 * Run: npx ts-node test/testnet-payment.ts
 */

import 'dotenv/config';
import { wrapFetchWithPaymentFromConfig } from '@x402/fetch';
import { ExactEvmScheme } from '@x402/evm';
import { privateKeyToAccount } from 'viem/accounts';

const BASE_SEPOLIA = 'eip155:84532';
const SERVER_URL = process.env.TEST_SERVER_URL || 'http://localhost:3000';

async function main() {
  // TEST_WALLET_PRIVATE_KEY nếu muốn dùng wallet riêng cho test
  // WALLET_PRIVATE_KEY là fallback (production wallet)
  const rawPk = process.env.TEST_WALLET_PRIVATE_KEY || process.env.WALLET_PRIVATE_KEY;
  if (!rawPk) throw new Error('TEST_WALLET_PRIVATE_KEY hoặc WALLET_PRIVATE_KEY chưa set');
  const pk = (rawPk.startsWith('0x') ? rawPk : `0x${rawPk}`) as `0x${string}`;

  const account = privateKeyToAccount(pk);
  console.log(`Buyer wallet: ${account.address}`);

  const fetchWithPayment = wrapFetchWithPaymentFromConfig(fetch, {
    schemes: [{
      network: BASE_SEPOLIA,
      client: new ExactEvmScheme(account),
    }],
  });

  // ── Test 1: GET /v1/morning ──────────────────────────────────────────────────
  console.log('\n── Test 1: /v1/morning ─────────────────');
  try {
    const res = await fetchWithPayment(`${SERVER_URL}/v1/morning`);
    const data = await res.json();
    console.log(`Status: ${res.status}`);
    console.log(`Cached: ${data.cached}`);
    console.log(`Brief (first 200 chars): ${data.brief?.substring(0, 200)}`);
  } catch (e: any) {
    console.error('Morning test failed:', e.message);
  }

  // ── Test 2: GET /v1/research ─────────────────────────────────────────────────
  console.log('\n── Test 2: /v1/research?query=bitcoin&type=bullbear ────');
  try {
    const res = await fetchWithPayment(
      `${SERVER_URL}/v1/research?query=bitcoin&type=bullbear`
    );
    const data = await res.json();
    console.log(`Status: ${res.status}`);
    console.log(`Type: ${data.type}, Query: ${data.query}`);
    console.log(`Analysis (first 300 chars): ${data.analysis?.substring(0, 300)}`);
  } catch (e: any) {
    console.error('Research test failed:', e.message);
  }

  // ── Test 3: Validation — bad params ─────────────────────────────────────────
  console.log('\n── Test 3: Bad params (expect 400 after payment) ────');
  try {
    const res = await fetchWithPayment(`${SERVER_URL}/v1/research?type=bullbear`);
    const data = await res.json();
    console.log(`Status: ${res.status}`, data);
  } catch (e: any) {
    console.error('Bad params test:', e.message);
  }
}

main().catch(console.error);
