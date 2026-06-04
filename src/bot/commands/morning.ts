import { Context } from 'grammy';
import { getMorningBrief } from '../../api/messari';
import { formatResponse, sendChunkedResponse } from '../../format';
import { cacheGet, cacheSet, TTL, hourBucket } from '../../cache';

export async function handleMorning(ctx: Context) {
  const pending = await ctx.reply('⏳ Fetching live market data & synthesizing brief... (~30–60s)');

  try {
    const key = `morning:${hourBucket()}`;
    const cached = cacheGet<string>(key);
    if (cached) {
      return sendChunkedResponse(ctx, pending.message_id, cached);
    }

    const { text, costUsd } = await getMorningBrief();
    const formatted = formatResponse(text, [], costUsd);

    cacheSet(key, formatted, TTL.MORNING);
    await sendChunkedResponse(ctx, pending.message_id, formatted);
  } catch (err: any) {
    await ctx.api.editMessageText(ctx.chat!.id, pending.message_id, `❌ ${err.message}`);
  }
}
