export const REPORT_TEMPLATES: Record<string, string> = {
  diligence: `Act as a Senior Crypto Analyst. Write a strictly formatted **Comprehensive Due Diligence Report** for: [QUERY_PLACEHOLDER]. 
Sections: 
**1. Executive Thesis:** (Why does this matter now? Core value prop).
**2. Mechanism Design & Architecture:** (Deep dive into consensus, state growth, or smart contract logic).
**3. Tokenomics & Value Accrual:** (Emission curves, burn rates, utility).
**4. Ecosystem & Traction:** (Developer activity, TVL, user retention).
**5. Risk Assessment:** (Identify 3 existential threats).
**6. Institutional Outlook:** (Buy/Hold/Watch).`,

  compare: `Act as a Protocol Researcher. Write an **In-Depth Comparison Report** critically comparing: [QUERY_PLACEHOLDER].
Sections:
**1. Philosophical & Strategic Differences:** (How do their approaches to the trilemma differ?).
**2. Technical Architecture Showdown:** (Throughput, finality, data availability trade-offs).
**3. Economic Model Comparison:** (Which token accrues value better?).
**4. Current Adoption & Moat:** (Institutional backing vs. retail momentum).
**5. Definitive Verdict:** (Declare a winner for a 3-year horizon with rationale).`,

  bullbear: `Act as a Macro Hedge Fund Manager. Provide a rigorously objective **Bull, Bear, and Balanced Case Report** for: [QUERY_PLACEHOLDER].
Sections:
**1. The Bull Thesis:** (3 high-conviction catalysts for massive outperformance).
**2. The Bear Thesis:** (3 structural/macro headwinds that could cause catastrophic underperformance).
**3. The Pragmatic Base Case:** (Synthesizing market realities).
**4. Actionable Portfolio Positioning:** (Weighted allocation recommendation).`,

  narrative: `Act as a Crypto Macro Strategist. Write a panoramic **Sector/Narrative Brief** for: [QUERY_PLACEHOLDER].
Sections:
**1. Macro Driver & TAM:** (Why is this narrative gaining traction vs TradFi?).
**2. Sub-Sector Breakdown:** (Categorize the layers, e.g., Infrastructure, Middleware, Consumer).
**3. Leading Protocols:** (Top 3 market leaders and their dominance scores).
**4. Innovation Bottlenecks:** (What tech or regulatory issues are holding the sector back?).
**5. 12-Month Projection:** (Fad or structural shift?).`,

  risk: `Act as a Crypto Technical Auditor and Policy Analyst. Write an exhaustive **Deep Risk & Policy/Tech Report** covering the issue: [QUERY_PLACEHOLDER].
Sections:
**1. Problem Formulation:** (Define the exact technical threat or regulatory act).
**2. Attack Vectors / Compliance Challenges:** (How it breaks cryptography, e.g., Quantum computing, or how it creates legal friction).
**3. Mitigation Strategies:** (Current efforts by core devs/institutions to hardfork or pivot).
**4. Timeline of Urgency:** (When does this transition from theoretical to existential?).
**5. Market Impact:** (How pricing factors in this risk today).`,

  morning: `Act as the Editor-in-Chief of Messari's Alpha Research Desk. Your objective is to scan all available Messari curated news, intel, and daily recaps from the past 24 hours.
Follow this strict data processing pipeline:
1. **Deduplication:** Aggressively filter out redundant news covering the same event across different outlets (e.g., CoinDesk and The Block covering the same ETF news).
2. **Curation:** Select the 10 to 15 most critical, market-moving events. Prioritize major structural crypto developments and 'Crypto x AI' narratives.
3. **Synthesis:** Present these events as a dynamic list of bullet points (use dashes -, NOT numbers). For each event, write EXACTLY one concise, heavily analytical paragraph (2-3 sentences max) capturing the core fact and its immediate market implication.
4. **Constraint:** Do NOT categorize them under headers. Do NOT generate fake hyperlinks in the text. I will programmatically append the verified sources at the bottom.`
};

export function getPromptTemplate(type: string, query: string): string {
  const globalRule = "\n\nCRITICAL FORMATTING RULE: Do NOT use Markdown tables (e.g., | Column |) in your response under any circumstances, as they render terribly on mobile chat apps. Use bulleted lists instead for any structured data or comparisons.";

  if (REPORT_TEMPLATES[type]) {
    return REPORT_TEMPLATES[type].replace('[QUERY_PLACEHOLDER]', query) + globalRule;
  }

  // Default Freestyle Fallback prompt for Deep Research
  return `Act as a Master Analyst at Messari Crypto. Answer the following query with deep analytical rigor, freedom of length, and insightful foresight. Do not constrain yourself to basic summaries. Use markdown to format the answer beautifully.
  
Query: "${query}"` + globalRule;
}
