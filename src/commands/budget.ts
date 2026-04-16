import { Context } from 'grammy';
import { getBudgetSummary } from '../core/budgetTracker';

export async function handleBudget(ctx: Context) {
  const summary = getBudgetSummary();
  return ctx.reply(summary);
}
