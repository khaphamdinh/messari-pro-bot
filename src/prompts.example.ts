import * as fs from 'fs';
import * as path from 'path';

/**
 * PROMPTS SKELETON (Lite Version)
 * For master-level research, customize these templates.
 */

export const REPORT_TEMPLATES: Record<string, string> = {
  diligence: `Act as a Crypto Research Analyst. Write a structured report for: [QUERY_PLACEHOLDER]. Include Summary, Technology, and Risk factors.`,
  compare: `Compare [QUERY_PLACEHOLDER] with its main competitors. Focus on TVL, TPS, and Security.`,
  bullbear: `Provide a Bull and Bear case for [QUERY_PLACEHOLDER].`,
  narrative: `Analyze the current landscape for the [QUERY_PLACEHOLDER] sector.`,
  risk: `What are the primary technical and regulatory risks for [QUERY_PLACEHOLDER]?`,
  tweet: `Write a short Twitter thread about [QUERY_PLACEHOLDER]. (1/X style).`
};

export function getPromptTemplate(type: string, query: string): string {
  const globalRule = `\n\nCONSTRAINT: Detect the user's language and respond in the same language. Do not use markdown tables.`;

  // Safe sample reading logic
  let sampleContext = '';
  try {
    const samplePath = path.join(__dirname, 'samples', `${type}.md`);
    if (fs.existsSync(samplePath)) {
      const sampleContent = fs.readFileSync(samplePath, 'utf8');
      sampleContext = `\n\n=== REFERENCE STYLE ===\n${sampleContent}\n\n`;
    }
  } catch (e) {}

  if (REPORT_TEMPLATES[type]) {
    return REPORT_TEMPLATES[type].replace('[QUERY_PLACEHOLDER]', query) + sampleContext + globalRule;
  }

  // Generic fallback for any other messages
  return `Act as an expert analyst and answer: "${query}"` + sampleContext + globalRule;
}
