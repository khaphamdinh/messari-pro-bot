import { Context } from 'grammy';
import { getAssetDetails, getAssetROI, getNewsFeed } from '../providers/messariData';
import { askMessariAI } from '../providers/messariAI';
import { canAfford } from '../core/budgetTracker';
import { sendChunkedResponse } from '../format';

export async function handleDeepReport(ctx: Context) {
  const match = ctx.message?.text?.match(/^\/deepreport\s+(.+)/i);
  if (!match) {
    return ctx.reply(
      'Usage: `/deepreport <asset>` (e.g., `/deepreport solana`)\nCost: ~$0.70–1.25',
      { parse_mode: 'Markdown' }
    );
  }

  const asset = match[1].trim().toLowerCase();

  if (!canAfford(1.25)) {
    return ctx.reply('⚠️ Insufficient daily budget for deep report (~$1.25 max). Use /budget to check.');
  }

  const pending = await ctx.reply(
    `🔬 Building composite report for **${asset}**...\n\n⏳ Gathering data from multiple endpoints (parallel)...`,
    { parse_mode: 'Markdown' }
  );

  try {
    // Step 1-3: Fetch all data in PARALLEL — saves ~60s vs sequential
    const includeNews = canAfford(0.80); // 0.55 news + 0.25 AI
    const dataPromises = [
      getAssetDetails({ assetSlugs: asset }),
      getAssetROI({ assetSlugs: asset }),
      includeNews ? getNewsFeed({ assetSlugs: asset, limit: '20' }) : Promise.resolve(null),
    ] as const;

    const [details, roi, news] = await Promise.all(dataPromises);

    await ctx.api.editMessageText(
      ctx.chat!.id, pending.message_id,
      `🔬 Building composite report for **${asset}**...\n\n✅ Data collected — Step 2/2: AI synthesis (30–60s)...`,
      { parse_mode: 'Markdown' }
    );

    // Step 4: Synthesize all data via AI ($0.25) — must be sequential (needs data)
    const dataContext = buildDataContext(asset, details, roi, news);
    const aiResult = await askMessariAI(dataContext);

    // Calculate total cost
    const totalCost = (details.costUsd || 0) + (roi.costUsd || 0) + (news?.costUsd || 0) + aiResult.costUsd;
    const finalResponse = formatDeepReport(aiResult.text, news, totalCost);

    await sendChunkedResponse(ctx, pending.message_id, finalResponse);
  } catch (err: any) {
    await ctx.api.editMessageText(ctx.chat!.id, pending.message_id, `❌ ${err.message}`);
  }
}

function buildDataContext(asset: string, details: any, roi: any, news: any): string {
  let context = `You are a senior crypto research analyst. Write a comprehensive, data-backed research brief for: ${asset}.

CRITICAL: Your analysis MUST be grounded in the REAL DATA provided below. Do NOT hallucinate metrics. If data is missing, say so.

=== STRUCTURED DATA (from Messari API) ===

`;

  if (details.success) {
    context += `ASSET DETAILS:\n${JSON.stringify(details.data, null, 2).slice(0, 3000)}\n\n`;
  } else {
    context += `ASSET DETAILS: Not available (${details.error})\n\n`;
  }

  if (roi.success) {
    context += `ROI DATA:\n${JSON.stringify(roi.data, null, 2).slice(0, 2000)}\n\n`;
  }

  if (news?.success) {
    context += `RECENT NEWS:\n${JSON.stringify(news.data, null, 2).slice(0, 3000)}\n\n`;
  }

  context += `=== END DATA ===

Write your analysis with these sections:
1. Executive Summary (2-3 sentences)
2. Key Metrics (based on REAL data above)
3. Recent Developments (based on news data)
4. Risk Factors (be specific)
5. Outlook
FORMATTING: No markdown tables. Use bulleted lists instead. 
DEPTH CONSTRAINT: You MUST write an exceptionally long and exhaustive analysis (MINIMUM 2500 WORDS). Do not summarize briefly. Expand aggressively on context and data points to deliver a masterclass-level deep dive.`;

  return context;
}

import { getBudgetState } from '../core/budgetTracker';

// Re-exported the function signature to include the original news object
function formatDeepReport(text: string, newsData: any, totalCost: number): string {
  const timestamp = new Date().toISOString().replace('T', ' ').split('.')[0];
  const state = getBudgetState();
  const remaining = state.dailyLimit - state.totalSpentToday;
  const recentEndpoints = Array.from(new Set(state.transactions.slice(-3).map(tx => tx.endpointId.replace('messari:', ''))));
  const usageFooter = `📈 \`Usage: $${state.totalSpentToday.toFixed(2)} / $${state.dailyLimit.toFixed(2)} (Rem: $${remaining.toFixed(2)})\`\n🔌 \`API Stack: ${recentEndpoints.join(' + ')}\``;

  let cleanedText = text.replace(/###\s(.*?)(?=\n|$)/g, '🔹 **$1**');
  cleanedText = cleanedText.replace(/##\s(.*?)(?=\n|$)/g, '🔥 **$1**');

  let curatedLinks = '';
  if (newsData && newsData.success && newsData.data && newsData.data.length > 0) {
    curatedLinks = '\n\n🔗 **Verified Sources (News Feed):**\n';
    const topNews = newsData.data.slice(0, 5);
    curatedLinks += topNews.map((s: any) => {
      const shortTitle = s.title.length > 40 ? s.title.substring(0, 40) + '...' : s.title;
      return `🗞️ [${shortTitle}](${s.url})`;
    }).join('\n');
  }

  const footer = `\n---${curatedLinks}\n\n🔬 *Composite Report (multi-endpoint)*\n💰 \`Total cost: $${totalCost.toFixed(2)}\`\n⏳ \`${timestamp}\`\n${usageFooter}\n🌐 \`Base Network\``;

  return `${cleanedText}\n${footer}`;
}
