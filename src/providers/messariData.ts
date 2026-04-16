import { fetchWithPayment } from '../core/x402Client';
import { ProviderResponse, ENDPOINT_COSTS } from '../types';
import { recordSpend, canAfford } from '../core/budgetTracker';

const BASE_URL = 'https://api.messari.io';

async function fetchMessariData(
  path: string,
  endpointId: string,
  params?: Record<string, string>
): Promise<ProviderResponse> {
  const cost = ENDPOINT_COSTS[endpointId] ?? 0;

  if (!canAfford(cost)) {
    return { success: false, data: null, costUsd: 0, endpointId, provider: 'messari', error: 'BUDGET_EXCEEDED' };
  }

  const url = new URL(path, BASE_URL);
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
        success: false, data: null, costUsd: 0, endpointId, provider: 'messari',
        error: `HTTP ${response.status}: ${errorBody.slice(0, 200)}`,
      };
    }

    const json = await response.json();
    recordSpend(endpointId, cost);

    return { success: true, data: json, costUsd: cost, endpointId, provider: 'messari' };
  } catch (err: any) {
    return { success: false, data: null, costUsd: 0, endpointId, provider: 'messari', error: err.message };
  }
}

// === FREE ENDPOINTS ($0.00) ===

export function listAssets(params?: { limit?: string; page?: string }) {
  return fetchMessariData('/metrics/v2/assets', 'messari:data:list-assets', params);
}

export function listMetrics() {
  return fetchMessariData('/metrics/v2/assets/metrics', 'messari:data:list-metrics');
}

// === PAID ENDPOINTS ===

export function getAssetDetails(params?: { assetSlugs?: string }) {
  return fetchMessariData('/metrics/v2/assets/details', 'messari:data:asset-details', params);
}

export function getAssetATH(params?: { assetSlugs?: string }) {
  return fetchMessariData('/metrics/v2/assets/ath', 'messari:data:asset-ath', params);
}

export function getAssetROI(params?: { assetSlugs?: string }) {
  return fetchMessariData('/metrics/v2/assets/roi', 'messari:data:asset-roi', params);
}

export function getNewsFeed(params?: { limit?: string; assetSlugs?: string }) {
  return fetchMessariData('/news/v1/news/feed', 'messari:data:news-feed', params);
}

export function getSignalsMindshareGainers24h() {
  return fetchMessariData('/signal/v1/assets/mindshare-gainers-24h', 'messari:data:signals-mindshare-gainers-24h');
}

export function getSignalsMindshareGainers7d() {
  return fetchMessariData('/signal/v1/assets/mindshare-gainers-7d', 'messari:data:signals-mindshare-gainers-7d');
}

export function getTokenUnlockEvents(assetId: string) {
  return fetchMessariData(
    `/token-unlocks/v1/assets/${assetId}/events`,
    'messari:data:token-unlock-events'
  );
}

export function getFundingRounds(params?: { limit?: string }) {
  return fetchMessariData('/funding/v1/rounds', 'messari:data:funding-rounds', params);
}
