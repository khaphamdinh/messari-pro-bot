import { Context } from 'grammy';
import { getNewsFeed } from '../providers/messariData';
import { formatDataResponse } from '../format';

export async function handleNews(ctx: Context) {
  const match = ctx.message?.text?.match(/^\/news(?:\s+(.+))?/i);
  const assetSlug = match?.[1]?.trim().toLowerCase();

  const pending = await ctx.reply('⏳ Fetching curated news feed...');

  try {
    const params: { limit: string; assetSlugs?: string } = { limit: '10' };
    if (assetSlug) params.assetSlugs = assetSlug;

    const result = await getNewsFeed(params);

    if (!result.success) {
      await ctx.api.editMessageText(ctx.chat!.id, pending.message_id, `❌ ${result.error}`);
      return;
    }

    const formatted = formatDataResponse(result.data, result.costUsd);
    try {
      await ctx.api.editMessageText(ctx.chat!.id, pending.message_id, formatted, { parse_mode: 'Markdown' });
    } catch {
      await ctx.api.editMessageText(ctx.chat!.id, pending.message_id, formatted);
    }
  } catch (err: any) {
    await ctx.api.editMessageText(ctx.chat!.id, pending.message_id, `❌ ${err.message}`);
  }
}
