import { Context } from 'grammy';
import { runResearch, VALID_TYPES } from '../../services/research';
import { formatResponse, sendChunkedResponse } from '../../format';

const VALID_TYPES_STR = VALID_TYPES.join(', ');
const MAX_QUERY_LENGTH = 200;

export async function handleReport(ctx: Context) {
  const match = ctx.message?.text?.match(/^\/report\s+(\w+)\s+(.*)/i);

  if (!match) {
    return ctx.reply(
      `❌ Syntax error. Try: \`/report <type> <topic>\`\nSupported types: \`${VALID_TYPES_STR}\``,
      { parse_mode: 'Markdown' }
    );
  }

  const [, templateType, query] = match;

  if (!VALID_TYPES.includes(templateType.toLowerCase() as any)) {
    return ctx.reply(
      `❌ Unknown type \`${templateType}\`. Supported: \`${VALID_TYPES_STR}\``,
      { parse_mode: 'Markdown' }
    );
  }

  if (query.length > MAX_QUERY_LENGTH) {
    return ctx.reply(`❌ Topic too long (${query.length} chars). Max ${MAX_QUERY_LENGTH} characters.`);
  }

  const pending = await ctx.reply('⏳ Connecting to Messari AI via Base network... (~30–60s)');

  try {
    const result = await runResearch(query, templateType.toLowerCase());
    const formatted = formatResponse(result.text, result.sources, result.costUsd);
    await sendChunkedResponse(ctx, pending.message_id, formatted);
  } catch (err: any) {
    await ctx.api.editMessageText(ctx.chat!.id, pending.message_id, `❌ ${err.message}`);
  }
}
