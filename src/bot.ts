import { Bot } from 'grammy';
import 'dotenv/config';
import { config } from './config';
import { setDailyLimit } from './core/budgetTracker';

import { handleStart, handleHelp, handleStatus } from './commands/general';
import { handleBalance } from './commands/balance';
import { handleBudget } from './commands/budget';
import { handleMorning } from './commands/morning';
import { handleReport } from './commands/report';
import { handleData } from './commands/data';
import { handleSignals } from './commands/signals';
import { handleNews } from './commands/news';
import { handleUnlocks } from './commands/unlocks';
import { handleFunding } from './commands/funding';
import { handleDeepReport } from './commands/deepreport';
import { handleFreestyle } from './commands/freestyle';

const bot = new Bot(config.TELEGRAM_BOT_TOKEN);
setDailyLimit(config.DAILY_BUDGET_LIMIT);

// Fix #1: Security Access Control Guard
const ALLOWED_IDS = (process.env.ALLOWED_USER_IDS || '')
  .split(',')
  .map(id => Number(id.trim()))
  .filter(Boolean);

bot.use(async (ctx, next) => {
  const userId = ctx.from?.id;
  // If list is empty, everyone is allowed. If not empty, strict check.
  if (ALLOWED_IDS.length > 0 && (!userId || !ALLOWED_IDS.includes(userId))) {
    console.warn(`Unauthorized access attempt from ID: ${userId}`);
    return; // Silently ignore to keep the bot's existence stealthy
  }
  return next();
});

bot.api.setMyCommands([
  { command: 'start', description: '🚀 Onboarding' },
  { command: 'help', description: '📖 Usage examples' },
  { command: 'morning', description: '🌅 24h market brief ($0.25)' },
  { command: 'report', description: '📄 Deep report ($0.25)' },
  { command: 'deepreport', description: '🔬 Composite report (~$1.00)' },
  { command: 'data', description: '📊 Asset data ($0.10)' },
  { command: 'signals', description: '📡 Mindshare signals ($0.35)' },
  { command: 'news', description: '🗞️ Curated news ($0.55)' },
  { command: 'unlocks', description: '🔓 Token unlocks ($0.15)' },
  { command: 'funding', description: '💸 Latest funding rounds ($0.15)' },
  { command: 'balance', description: '💰 Wallet balance' },
  { command: 'budget', description: '📋 Daily spending tracker' },
  { command: 'status', description: '🟢 Bot status' },
]).catch(err => console.error('Failed to set commands:', err));

bot.command('start', handleStart);
bot.command('help', handleHelp);
bot.command('status', handleStatus);
bot.command('balance', handleBalance);
bot.command('budget', handleBudget);
bot.command('morning', handleMorning);
bot.command('report', handleReport);
bot.command('data', handleData);
bot.command('signals', handleSignals);
bot.command('news', handleNews);
bot.command('unlocks', handleUnlocks);
bot.command('funding', handleFunding);
bot.command('deepreport', handleDeepReport);

bot.on('message:text', handleFreestyle);

bot.catch((err) => console.error('Bot error:', err));

bot.start();
console.log('🚀 Messari Pro Bot v2 running...');
