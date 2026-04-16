import { Context } from 'grammy';
import { getTokenUnlockEvents } from '../providers/messariData';
import { formatDataResponse } from '../format';

export async function handleUnlocks(ctx: Context) {
  const match = ctx.message?.text?.match(/^\/unlocks\s+(.+)/i);
  if (!match) {
    return ctx.reply('Usage: `/unlocks <asset>` (e.g., `/unlocks solana`)', { parse_mode: 'Markdown' });
  }

  const assetId = match[1].trim().toLowerCase();
  const pending = await ctx.reply('⏳ Fetching token unlock schedule...');

  try {
    const result = await getTokenUnlockEvents(assetId);

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
