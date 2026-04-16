import { fetchWithPayment } from '../core/x402Client';
import { ProviderResponse, ENDPOINT_COSTS } from '../types';
import { recordSpend, canAfford } from '../core/budgetTracker';

const CMC_BASE_URL = 'https://pro-api.coinmarketcap.com/x402';
const COST = ENDPOINT_COSTS['cmc:data:generic']; // $0.01

async function fetchCMC(
  path: string,
  params?: Record<string, string>
): Promise<ProviderResponse> {
  if (!canAfford(COST)) {
    return { success: false, data: null, costUsd: 0, endpointId: 'cmc:data:generic', provider: 'cmc', error: 'BUDGET_EXCEEDED' };
  }

  const url = new URL(path, CMC_BASE_URL);
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  }

  try {
    const response = await fetchWithPayment(url.toString(), {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      const errorBody = await response.text().catch(() => '');
      return {
        success: false, data: null, costUsd: 0, endpointId: 'cmc:data:generic', provider: 'cmc',
        error: `HTTP ${response.status}: ${errorBody.slice(0, 200)}`,
      };
    }

    const json = await response.json();
    recordSpend('cmc:data:generic', COST);

    return { success: true, data: json, costUsd: COST, endpointId: 'cmc:data:generic', provider: 'cmc' };
  } catch (err: any) {
    return { success: false, data: null, costUsd: 0, endpointId: 'cmc:data:generic', provider: 'cmc', error: err.message };
  }
}

export function cmcLatestQuotes(symbol: string) {
  return fetchCMC(`/v2/cryptocurrency/quotes/latest`, { symbol });
}

export function cmcDexSearch(query: string) {
  return fetchCMC(`/v1/dex/search`, { q: query });
}

export function cmcTrending() {
  return fetchCMC(`/v1/cryptocurrency/trending/latest`);
}
