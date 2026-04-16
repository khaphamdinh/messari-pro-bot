import { Context } from 'grammy';
import { askMessariAI } from '../providers/messariAI';
import { getPromptTemplate } from '../prompts';
import { formatResponse, sendChunkedResponse } from '../format';

export async function handleFreestyle(ctx: Context) {
  const query = ctx.message?.text;
  if (!query || query.startsWith('/')) return;

  const pending = await ctx.reply('⏳ Connecting to Messari AI via Base network... (~30–60s)');

  try {
    const prompt = getPromptTemplate('fallback', query);
    const aiResult = await askMessariAI(prompt);
    const formatted = formatResponse(aiResult.text, aiResult.sources, aiResult.costUsd);

    await sendChunkedResponse(ctx, pending.message_id, formatted);
  } catch (err: any) {
    await ctx.api.editMessageText(ctx.chat!.id, pending.message_id, `❌ ${err.message}`);
  }
}
