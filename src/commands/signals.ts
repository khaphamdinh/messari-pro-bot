import { Context } from 'grammy';
import { getSignalsMindshareGainers24h } from '../providers/messariData';
import { formatDataResponse } from '../format';

export async function handleSignals(ctx: Context) {
  const pending = await ctx.reply('⏳ Fetching mindshare signals...');

  try {
    const result = await getSignalsMindshareGainers24h();

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
