import { Context } from 'grammy';
import { runResearch } from '../../api/services/research';
import { formatResponse, sendChunkedResponse } from '../../format';

export async function handleReport(ctx: Context) {
  const match = ctx.message?.text?.match(/^\/report\s+(\w+)\s+(.*)/i);

  if (!match) {
    return ctx.reply(
      '❌ Syntax error. Please try: `/report <type> <topic>`\nSupported types: `diligence`, `compare`, `bullbear`, `narrative`, `risk`, `tweet`',
      { parse_mode: 'Markdown' }
    );
  }

  const [, templateType, query] = match;
  const pending = await ctx.reply('⏳ Connecting to Messari AI via Base network... (~30–60s)');

  try {
    const result = await runResearch(query, templateType);
    const formatted = formatResponse(result.text, result.sources, result.costUsd);
    await sendChunkedResponse(ctx, pending.message_id, formatted);
  } catch (err: any) {
    await ctx.api.editMessageText(ctx.chat!.id, pending.message_id, `❌ ${err.message}`);
  }
}
