import { Context } from 'grammy';
import { getFundingRounds } from '../providers/messariData';
import { formatDataResponse } from '../format';

export async function handleFunding(ctx: Context) {
  const pending = await ctx.reply('⏳ Fetching latest funding rounds...');

  try {
    const result = await getFundingRounds({ limit: '10' });

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
