import { Context } from 'grammy';
import { getBudgetState } from './core/budgetTracker';

function getUsageFooter(): string {
  const state = getBudgetState();
  const remaining = state.dailyLimit - state.totalSpentToday;
  const recentEndpoints = Array.from(new Set(state.transactions.slice(-3).map(tx => tx.endpointId.replace('messari:', ''))));
  return `📈 \`Usage: $${state.totalSpentToday.toFixed(2)} / $${state.dailyLimit.toFixed(2)} (Rem: $${remaining.toFixed(2)})\`\n🔌 \`API Stack: ${recentEndpoints.join(' + ')}\``;
}

export function formatResponse(
  rawText: string,
  sources: Array<{ domain: string; title: string; url: string }> = [],
  costUsd: number
): string {
  const timestamp = new Date().toISOString().replace('T', ' ').split('.')[0];

  let curatedLinks = '';
  if (sources && sources.length > 0) {
    const validSources = sources.filter(s =>
      ['news', 'intel', 'research_report', 'trending_topic'].includes(s.domain)
    );
    const uniqueSources = Array.from(new Map(validSources.map(s => [s.url, s])).values()).slice(0, 15);

    if (uniqueSources.length > 0) {
      curatedLinks = '\n\n🔗 **Verified Sources:**\n';
      curatedLinks += uniqueSources.map(s => {
        const shortName = s.title.split(' ').slice(0, 6).join(' ').replace(/[\\[\]_*]/g, '') +
          (s.title.split(' ').length > 6 ? '...' : '');
        const emoji = s.domain === 'news' ? '🗞️' : s.domain === 'intel' ? '🧠' : s.domain === 'trending_topic' ? '🔥' : '🔗';
        return `${emoji} [${shortName}](${s.url})`;
      }).join('\n');
    }
  }

  let cleanedText = rawText.replace(/###\s(.*?)(?=\n|$)/g, '🔹 **$1**');
  cleanedText = cleanedText.replace(/##\s(.*?)(?=\n|$)/g, '🔥 **$1**');
  cleanedText = cleanedText.replace(/^\*\s+\*\*/gm, '🔸 **');

  const footer = `\n---\n💰 \`Cost: $${costUsd.toFixed(2)}\` | ⏳ \`${timestamp}\`\n${getUsageFooter()}\n🌐 \`Base Network\``;
  return `${cleanedText}\n---${curatedLinks}${footer}`;
}

// Smart formatter — extracts known fields instead of dumping raw JSON
export function formatDataResponse(data: any, costUsd: number): string {
  const timestamp = new Date().toISOString().replace('T', ' ').split('.')[0];
  const raw = data?.data || data;

  // Try to detect data type and format accordingly
  if (Array.isArray(raw)) {
    return formatArrayData(raw, costUsd, timestamp);
  }
  if (raw && typeof raw === 'object') {
    return formatObjectData(raw, costUsd, timestamp);
  }

  // Fallback — truncated JSON
  const content = JSON.stringify(raw, null, 2).slice(0, 3500);
  return `📊 **Data Response**\n\`\`\`\n${content}\n\`\`\`\n---\n💰 Cost: $${costUsd.toFixed(2)} | ⏳ ${timestamp}`;
}

function formatArrayData(items: any[], costUsd: number, timestamp: string): string {
  const limited = items.slice(0, 15);
  let output = `📊 **Results** (${items.length} items, showing top ${limited.length})\n\n`;

  for (const item of limited) {
    const name = item.name || item.title || item.slug || 'Unknown';
    const symbol = item.symbol ? ` (${item.symbol})` : '';

    output += `🔸 **${name}${symbol}**\n`;

    // Asset metrics
    if (item.metrics?.market_data) {
      const md = item.metrics.market_data;
      if (md.price_usd != null) output += `  💵 Price: $${formatNum(md.price_usd)}\n`;
      if (md.real_volume_last_24_hours != null) output += `  📈 24h Vol: $${formatNum(md.real_volume_last_24_hours)}\n`;
      if (md.percent_change_usd_last_24_hours != null) output += `  ${md.percent_change_usd_last_24_hours >= 0 ? '🟢' : '🔴'} 24h: ${md.percent_change_usd_last_24_hours.toFixed(2)}%\n`;
    }
    if (item.metrics?.marketcap?.current_marketcap_usd != null) {
      output += `  🏦 MCap: $${formatNum(item.metrics.marketcap.current_marketcap_usd)}\n`;
    }

    // News items
    if (item.url && item.published_at) {
      const date = new Date(item.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      output += `  📅 ${date}\n  🔗 ${item.url}\n`;
    }

    // Funding rounds
    if (item.amount_raised_usd != null) {
      output += `  💰 Raised: $${formatNum(item.amount_raised_usd)}\n`;
    }
    if (item.round_type) output += `  📋 Type: ${item.round_type}\n`;

    // Token unlock events
    if (item.unlock_date || item.date) {
      const d = item.unlock_date || item.date;
      output += `  📅 Date: ${new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}\n`;
    }
    if (item.tokens_unlocked != null) output += `  🔓 Tokens: ${formatNum(item.tokens_unlocked)}\n`;

    // Signal / mindshare
    if (item.mindshare != null) output += `  🧠 Mindshare: ${(item.mindshare * 100).toFixed(2)}%\n`;
    if (item.mindshare_change != null) output += `  ${item.mindshare_change >= 0 ? '📈' : '📉'} Change: ${(item.mindshare_change * 100).toFixed(2)}%\n`;

    output += '\n';
  }

  const footer = `\n---\n💰 \`Cost: $${costUsd.toFixed(2)}\` | ⏳ \`${timestamp}\`\n${getUsageFooter()}`;
  output += footer;
  return output;
}

function formatObjectData(obj: any, costUsd: number, timestamp: string): string {
  let output = '';

  const name = obj.name || obj.slug || '';
  const symbol = obj.symbol ? ` (${obj.symbol})` : '';
  if (name) output += `📊 **${name}${symbol}**\n\n`;

  // Flatten known Messari structures
  const metrics = obj.metrics || obj;

  // Market data
  const md = metrics.market_data || metrics.marketData;
  if (md) {
    output += '💹 **Market Data:**\n';
    if (md.price_usd != null) output += `- 💵 Price: $${formatNum(md.price_usd)}\n`;
    if (md.volume_last_24_hours != null) output += `- 📈 24h Volume: $${formatNum(md.volume_last_24_hours)}\n`;
    if (md.real_volume_last_24_hours != null) output += `- 📈 Real 24h Vol: $${formatNum(md.real_volume_last_24_hours)}\n`;
    if (md.percent_change_usd_last_24_hours != null) output += `- ${md.percent_change_usd_last_24_hours >= 0 ? '🟢' : '🔴'} 24h Change: ${md.percent_change_usd_last_24_hours.toFixed(2)}%\n`;
    if (md.percent_change_usd_last_7_days != null) output += `- 7d Change: ${md.percent_change_usd_last_7_days.toFixed(2)}%\n`;
    output += '\n';
  }

  // Market cap
  const mcap = metrics.marketcap;
  if (mcap) {
    output += '🏦 **Market Cap:**\n';
    if (mcap.current_marketcap_usd != null) output += `- Current: $${formatNum(mcap.current_marketcap_usd)}\n`;
    if (mcap.rank != null) output += `- Rank: #${mcap.rank}\n`;
    output += '\n';
  }

  // Supply
  const supply = metrics.supply;
  if (supply) {
    output += '📦 **Supply:**\n';
    if (supply.circulating != null) output += `- Circulating: ${formatNum(supply.circulating)}\n`;
    if (supply.y_2050 != null) output += `- Max (2050): ${formatNum(supply.y_2050)}\n`;
    output += '\n';
  }

  // ATH
  const ath = metrics.all_time_high || obj.ath;
  if (ath) {
    output += '🏔️ **All-Time High:**\n';
    if (ath.price != null) output += `- Price: $${formatNum(ath.price)}\n`;
    if (ath.at != null) output += `- Date: ${new Date(ath.at).toLocaleDateString()}\n`;
    if (ath.percent_down != null) output += `- Down from ATH: ${ath.percent_down.toFixed(1)}%\n`;
    output += '\n';
  }

  // ROI
  const roi = metrics.roi_data || obj.roi_data;
  if (roi) {
    output += '📊 **ROI:**\n';
    if (roi.percent_change_last_1_week != null) output += `- 1W: ${roi.percent_change_last_1_week.toFixed(2)}%\n`;
    if (roi.percent_change_last_1_month != null) output += `- 1M: ${roi.percent_change_last_1_month.toFixed(2)}%\n`;
    if (roi.percent_change_last_3_months != null) output += `- 3M: ${roi.percent_change_last_3_months.toFixed(2)}%\n`;
    if (roi.percent_change_last_1_year != null) output += `- 1Y: ${roi.percent_change_last_1_year.toFixed(2)}%\n`;
    output += '\n';
  }

  // If nothing was extracted, fallback to key dump
  if (!output || output.length < 50) {
    const keys = Object.keys(obj).slice(0, 20);
    output += '📋 **Available Fields:**\n';
    for (const key of keys) {
      const val = obj[key];
      if (val != null && typeof val !== 'object') {
        output += `- ${key}: ${String(val).slice(0, 100)}\n`;
      } else if (val != null) {
        output += `- ${key}: [object]\n`;
      }
    }
  }

  const footer = `\n---\n💰 \`Cost: $${costUsd.toFixed(2)}\` | ⏳ \`${timestamp}\`\n${getUsageFooter()}`;
  output += footer;
  return output;
}

function formatNum(n: number): string {
  if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(2) + 'B';
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(2) + 'M';
  if (n >= 1_000) return (n / 1_000).toFixed(2) + 'K';
  if (n < 0.01) return n.toPrecision(4);
  return n.toFixed(2);
}

// Utility: Send long text as chunked Telegram messages with Markdown fallback
export async function sendChunkedResponse(
  ctx: Context,
  pendingMessageId: number,
  text: string,
): Promise<void> {
  // Convert standard Markdown to Telegram Legacy Markdown
  // 1. Convert **bold** to *bold* (Telegram's syntax for bold)
  let telegramReadyText = text.replace(/\*\*(.*?)\*\*/g, '*$1*');
  
  // 2. Format headers properly (in case AI uses # instead of custom format)
  telegramReadyText = telegramReadyText.replace(/^#+\s(.*?)$/gm, '🔥 *$1*');
  
  // Note: Telegram Legacy Markdown does not support strikethrough (~~). 
  // For safety and to prevent UI clutter, we just strip ~~ markers if AI uses them.
  telegramReadyText = telegramReadyText.replace(/~~(.*?)~~/g, '$1');

  const CHUNK_SIZE = 4000;
  const chunks: string[] = [];
  for (let i = 0; i < telegramReadyText.length; i += CHUNK_SIZE) {
    chunks.push(telegramReadyText.substring(i, i + CHUNK_SIZE));
  }

  // First chunk — edit the pending "loading" message
  try {
    await ctx.api.editMessageText(ctx.chat!.id, pendingMessageId, chunks[0], { parse_mode: 'Markdown' });
  } catch (e) {
    console.error("Markdown parse error on chunk 0:", e);
    await ctx.api.editMessageText(ctx.chat!.id, pendingMessageId, chunks[0]);
  }

  // Remaining chunks — send as new messages
  for (let i = 1; i < chunks.length; i++) {
    try {
      await ctx.reply(chunks[i], { parse_mode: 'Markdown' });
    } catch (e) {
      console.error(`Markdown parse error on chunk ${i}:`, e);
      await ctx.reply(chunks[i]);
    }
  }
}
