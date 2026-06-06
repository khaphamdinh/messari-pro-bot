import { fetchMarketSnapshot } from '../providers/coingecko';
import { synthesizeMorningBrief } from '../providers/blockrun';

export interface MorningBriefResult {
  text: string;
  costUsd: number;
}

export async function getMorningBrief(): Promise<MorningBriefResult> {
  const snapshot = await fetchMarketSnapshot();
  const result = await synthesizeMorningBrief(snapshot);
  return { text: result.text, costUsd: result.costUsd };
}
