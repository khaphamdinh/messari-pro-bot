import { fetchWithPayment } from '../core/x402Client';
import { AIResponse, ENDPOINT_COSTS } from '../types';
import { recordSpend, canAfford } from '../core/budgetTracker';

const MESSARI_AI_URL = 'https://api.messari.io/ai/v2/chat/completions';
const COST = ENDPOINT_COSTS['messari:ai:chat'];

export async function askMessariAI(promptContext: string): Promise<AIResponse> {
  if (!canAfford(COST)) {
    throw new Error('BUDGET_EXCEEDED: Daily spending limit reached. Use /budget to check.');
  }

  const payload = {
    messages: [{ role: 'user', content: promptContext }],
    response_format: 'markdown',
    stream: false,
  };

  try {
    const response = await fetchWithPayment(MESSARI_AI_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorBody = await response.text().catch(() => 'No body');
      if (response.status === 402) {
        throw new Error('INSUFFICIENT_FUNDS: Not enough USDC or ETH on Base wallet.');
      }
      throw new Error(`MESSARI_API_ERROR: ${response.status} ${response.statusText} — ${errorBody}`);
    }

    const json = await response.json();

    const text =
      json?.data?.messages?.[0]?.content ||
      json?.choices?.[0]?.message?.content ||
      json?.data?.content ||
      json?.content ||
      null;

    if (!text) {
      console.error('[MessariAI] Unexpected response structure:', JSON.stringify(json).slice(0, 500));
      throw new Error('PARSE_ERROR: Could not extract text from Messari AI response. Check logs.');
    }

    const sources = json?.metadata?.sources || json?.data?.metadata?.sources || [];

    recordSpend('messari:ai:chat', COST);

    return { text, sources, costUsd: COST };
  } catch (err: any) {
    if (
      err.message.startsWith('BUDGET_EXCEEDED') ||
      err.message.startsWith('INSUFFICIENT_FUNDS') ||
      err.message.startsWith('MESSARI_API_ERROR') ||
      err.message.startsWith('PARSE_ERROR')
    ) {
      throw err;
    }
    if (err.message?.includes('timeout') || err.message?.includes('fetch failed')) {
      throw new Error('TIMEOUT: Request timed out. Payment may still settle — check Basescan.');
    }
    throw new Error(`UNKNOWN_ERROR: ${err.message}`);
  }
}
