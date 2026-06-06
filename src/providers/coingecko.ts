const BASE = 'https://api.coingecko.com/api/v3';

export interface MarketSnapshot {
  trending: string;
  globalChange24h: string;
  btcDominance: string;
  totalMarketCapUsd: string;
  topAssets: string;
  topMovers: string;
}

function fmt(n: number): string {
  if (n >= 1e12) return (n / 1e12).toFixed(2) + 'T';
  if (n >= 1e9)  return (n / 1e9).toFixed(2) + 'B';
  if (n >= 1e6)  return (n / 1e6).toFixed(2) + 'M';
  return n.toFixed(2);
}

export async function fetchMarketSnapshot(): Promise<MarketSnapshot> {
  const [trendingRes, globalRes, topRes] = await Promise.all([
    fetch(`${BASE}/search/trending`).then(r => r.json()),
    fetch(`${BASE}/global`).then(r => r.json()),
    fetch(`${BASE}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&sparkline=false`).then(r => r.json()),
  ]);

  const trending = (trendingRes.coins as any[])
    ?.slice(0, 7)
    .map((c: any) => `${c.item.name} (${c.item.symbol.toUpperCase()})`)
    .join(', ') ?? 'N/A';

  const g = globalRes.data;
  const chgPct = g?.market_cap_change_percentage_24h_usd;
  const globalChange24h = chgPct != null ? chgPct.toFixed(2) + '%' : 'N/A';
  const btcPct = g?.market_cap_percentage?.btc;
  const btcDominance = btcPct != null ? btcPct.toFixed(1) + '%' : 'N/A';
  const totalMarketCapUsd = '$' + fmt(g?.total_market_cap?.usd ?? 0);

  const top20 = (topRes as any[]) ?? [];

  const topAssets = top20
    .slice(0, 10)
    .map((c: any) => {
      const chg = c.price_change_percentage_24h;
      const sign = chg >= 0 ? '+' : '';
      return `${c.symbol.toUpperCase()}: $${fmt(c.current_price)} (${sign}${chg?.toFixed(1)}%) MCap $${fmt(c.market_cap)}`;
    })
    .join('\n');

  const sorted = [...top20]
    .filter(c => c.price_change_percentage_24h != null)
    .sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);

  const gainers = sorted.slice(0, 3).map((c: any) => {
    const chg = c.price_change_percentage_24h;
    return `${c.symbol.toUpperCase()} +${chg.toFixed(1)}%`;
  }).join(', ');

  const losers = sorted.slice(-3).reverse().map((c: any) => {
    const chg = c.price_change_percentage_24h;
    return `${c.symbol.toUpperCase()} ${chg.toFixed(1)}%`;
  }).join(', ');

  const topMovers = `Best: ${gainers} | Worst: ${losers}`;

  return { trending, globalChange24h, btcDominance, totalMarketCapUsd, topAssets, topMovers };
}
