import { Context } from 'grammy';
import { getAssetDetails } from '../providers/messariData';
import { formatDataResponse } from '../format';

export async function handleData(ctx: Context) {
  const match = ctx.message?.text?.match(/^\/data\s+(.+)/i);
  if (!match) {
    return ctx.reply('Usage: `/data <asset>` (e.g., `/data solana`)', { parse_mode: 'Markdown' });
  }

  const assetSlug = match[1].trim().toLowerCase();
  const pending = await ctx.reply('⏳ Fetching asset data...');

  try {
    const result = await getAssetDetails({ assetSlugs: assetSlug });

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
