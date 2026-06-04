import { askMessariAI } from '../../providers/messariAI';
import { getPromptTemplate } from '../../prompts';

export const VALID_TYPES = ['diligence', 'compare', 'bullbear', 'narrative', 'risk', 'tweet'] as const;
export type ResearchType = typeof VALID_TYPES[number];

export interface ResearchResult {
  text: string;
  sources: Array<{ domain: string; title: string; url: string }>;
  costUsd: number;
  type: string;
  query: string;
}

export async function runResearch(query: string, type: string = 'diligence'): Promise<ResearchResult> {
  const prompt = getPromptTemplate(type, query);
  const result = await askMessariAI(prompt);
  return {
    text: result.text,
    sources: result.sources,
    costUsd: result.costUsd,
    type,
    query,
  };
}
