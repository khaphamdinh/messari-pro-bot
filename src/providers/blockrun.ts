import { fetchWithPayment } from '../core/x402Client';
import { MarketSnapshot } from './coingecko';

const BLOCKRUN_URL = 'https://blockrun.ai/api/v1/chat/completions';

// Primary: NVIDIA free. Fallback: DeepSeek $0.001 when NVIDIA is overloaded.
const MODELS: Array<{ id: string; costUsd: number }> = [
  { id: 'nvidia/deepseek-v3.2',  costUsd: 0.000 },
  { id: 'deepseek/deepseek-chat', costUsd: 0.001 },
];

function buildPrompt(s: MarketSnapshot): string {
  return `You are an elite Crypto Research Analyst. Based ONLY on the live market data below, write a comprehensive Daily Alpha Brief.

LIVE MARKET DATA (${new Date().toUTCString()}):
- Global 24h Change: ${s.globalChange24h}
- Total Market Cap: ${s.totalMarketCapUsd}
- BTC Dominance: ${s.btcDominance}
- Trending Now: ${s.trending}
- Top Movers 24h: ${s.topMovers}

TOP ASSETS:
${s.topAssets}

INSTRUCTIONS:
Write 10–15 analytical bullet points (dashes -, NO numbers, NO headers).
Each bullet: 2–3 concise sentences. Add real alpha beyond just price reporting.
Cover: market sentiment, notable movers, BTC dominance implications, trending coin catalysts, sector rotation signals, what to watch next 24h.
Use **bold** for key terms. Do NOT invent data. Do NOT use tables.`;
}

export interface BlockRunResult {
  text: string;
  costUsd: number;
  model: string;
}

async function callModel(modelId: string, prompt: string): Promise<string> {
  const response = await fetchWithPayment(BLOCKRUN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: modelId,
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 1200,
    }),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => '');
    throw new Error(`BLOCKRUN_ERROR: ${response.status} — ${body}`);
  }

  const json = await response.json();
  const text = json?.choices?.[0]?.message?.content ?? null;
  if (!text) throw new Error('BLOCKRUN_PARSE_ERROR: No content in response');
  return text as string;
}

export async function synthesizeMorningBrief(snapshot: MarketSnapshot): Promise<BlockRunResult> {
  const prompt = buildPrompt(snapshot);
  let lastError: Error | null = null;

  for (const model of MODELS) {
    try {
      const text = await callModel(model.id, prompt);
      if (model.id !== MODELS[0].id) {
        console.log(`[BlockRun] Used fallback model: ${model.id} ($${model.costUsd})`);
      }
      return { text, costUsd: model.costUsd, model: model.id };
    } catch (err: any) {
      lastError = err;
      if (!err.message.includes('503') && !err.message.includes('429') && !err.message.includes('524') && !err.message.includes('FREE_MODEL_FAILED')) {
        throw err;
      }
      console.warn(`[BlockRun] ${model.id} unavailable, trying next...`);
    }
  }

  throw lastError ?? new Error('BLOCKRUN_ERROR: All models failed');
}
