// Cost per endpoint (in USD) — source of truth
export const ENDPOINT_COSTS: Record<string, number> = {
  // Messari AI
  'messari:ai:chat': 0.25,

  // Messari Data — FREE
  'messari:data:list-assets': 0.00,

  // Messari Data — Paid
  'messari:data:asset-details': 0.10,
  'messari:data:asset-ath': 0.10,
  'messari:data:asset-roi': 0.10,
  'messari:data:asset-timeseries-1d': 0.15,
  'messari:data:asset-timeseries-1h': 0.18,
  'messari:data:news-feed': 0.55,
  'messari:data:signals-assets': 0.55,
  'messari:data:signals-mindshare-gainers-24h': 0.35,
  'messari:data:signals-mindshare-losers-24h': 0.35,
  'messari:data:token-unlock-events': 0.15,
  'messari:data:token-unlock-unlocks': 0.75,
  'messari:data:token-unlock-vesting': 0.75,
  'messari:data:funding-rounds': 0.15,
  'messari:data:funding-rounds-investors': 0.25,
};

export interface ProviderResponse {
  success: boolean;
  data: any;
  costUsd: number;
  endpointId: string;
  provider: 'messari';
  error?: string;
}

export interface AIResponse {
  text: string;
  sources: Array<{ domain: string; title: string; url: string }>;
  costUsd: number;
}

export interface BudgetState {
  totalSpentToday: number;
  dailyLimit: number;
  transactions: Array<{
    timestamp: Date;
    endpointId: string;
    costUsd: number;
  }>;
}

