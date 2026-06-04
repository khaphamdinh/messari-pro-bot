import { Context } from 'grammy';
import { fetchWithPayment } from '../core/x402Client';

export async function handleTestQuality(ctx: Context) {
  await ctx.reply("🔄 Đang fetch CoinGecko + test synthesis... ~30s");

  try {
    const [trending, globalData, top] = await Promise.all([
      fetch('https://api.coingecko.com/api/v3/search/trending').then(r => r.json()),
      fetch('https://api.coingecko.com/api/v3/global').then(r => r.json()),
      fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=8&sparkline=false').then(r => r.json()),
    ]);

    const cgData = {
      trending: trending.coins?.slice(0, 5).map((c: any) => `${c.item.name} (${c.item.symbol})`).join(', '),
      btcDom: globalData.data?.market_cap_percentage?.btc?.toFixed(1) + '%',
      change24h: globalData.data?.market_cap_change_percentage_24h_usd?.toFixed(2) + '%',
      top8: top?.map((c: any) => `${c.symbol.toUpperCase()}: $${c.current_price.toLocaleString()} (${c.price_change_percentage_24h?.toFixed(1)}%)`).join('\n'),
    };

    const prompt = `You are a crypto analyst. Write a 5-item Daily Alpha Brief based ONLY on this data. No intro.

Global: MCap change ${cgData.change24h} | BTC Dom ${cgData.btcDom}
Trending: ${cgData.trending}
Prices:\n${cgData.top8}

Format: 🔴/🟢/🟡 [HEADLINE] | [insight] | [impact]`;

    const results: string[] = [];

    for (const model of ['nvidia/deepseek-v3.2', 'deepseek/deepseek-chat']) {
      const label = model.includes('nvidia') ? '🆓 NVIDIA free' : '💰 DeepSeek $0.001';
      const t = Date.now();

      try {
        const res = await fetchWithPayment('https://blockrun.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model,
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 600,
          }),
        });

        if (!res.ok) {
          results.push(`${label}: ❌ Error ${res.status}`);
          continue;
        }

        const data = await res.json();
        const output = data.choices?.[0]?.message?.content ?? 'no output';
        const ms = Date.now() - t;
        results.push(`${label} [${ms}ms]:\n${output}`);
      } catch (e: any) {
        results.push(`${label}: ❌ ${e.message}`);
      }
    }

    const msg = results.join('\n\n' + '─'.repeat(30) + '\n\n');

    if (msg.length > 4000) {
      await ctx.reply(msg.substring(0, 4000));
      await ctx.reply(msg.substring(4000));
    } else {
      await ctx.reply(msg);
    }

  } catch (e: any) {
    await ctx.reply(`❌ Error: ${e.message}`);
  }
}
