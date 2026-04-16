import { Context } from 'grammy';
import { askMessariAI } from '../providers/messariAI';
import { getPromptTemplate } from '../prompts';
import { formatResponse, sendChunkedResponse } from '../format';

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
    const prompt = getPromptTemplate(templateType, query);
    const aiResult = await askMessariAI(prompt);
    const formatted = formatResponse(aiResult.text, aiResult.sources, aiResult.costUsd);

    await sendChunkedResponse(ctx, pending.message_id, formatted);
  } catch (err: any) {
    await ctx.api.editMessageText(ctx.chat!.id, pending.message_id, `❌ ${err.message}`);
  }
}
