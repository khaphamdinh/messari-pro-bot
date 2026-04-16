import { BudgetState } from '../types';

// In-memory tracker (resets on bot restart — sufficient for personal use)
const state: BudgetState = {
  totalSpentToday: 0,
  dailyLimit: 5.00,
  transactions: [],
};

let lastResetDate = new Date().toISOString().split('T')[0];

function checkAndResetDaily(): void {
  const today = new Date().toISOString().split('T')[0];
  if (today !== lastResetDate) {
    state.totalSpentToday = 0;
    state.transactions = [];
    lastResetDate = today;
  }
}

export function canAfford(costUsd: number): boolean {
  checkAndResetDaily();
  return (state.totalSpentToday + costUsd) <= state.dailyLimit;
}

export function recordSpend(endpointId: string, costUsd: number): void {
  checkAndResetDaily();
  state.totalSpentToday += costUsd;
  state.transactions.push({
    timestamp: new Date(),
    endpointId,
    costUsd,
  });
}

export function getBudgetSummary(): string {
  checkAndResetDaily();
  const remaining = state.dailyLimit - state.totalSpentToday;
  const txCount = state.transactions.length;
  const breakdown = state.transactions.reduce((acc, tx) => {
    acc[tx.endpointId] = (acc[tx.endpointId] || 0) + tx.costUsd;
    return acc;
  }, {} as Record<string, number>);

  let summary = `💰 Budget: $${state.totalSpentToday.toFixed(2)} / $${state.dailyLimit.toFixed(2)} (${txCount} calls)\n`;
  summary += `📊 Remaining: $${remaining.toFixed(2)}\n`;

  if (Object.keys(breakdown).length > 0) {
    summary += `\n📋 Breakdown:\n`;
    for (const [endpoint, cost] of Object.entries(breakdown)) {
      summary += `- ${endpoint}: $${cost.toFixed(2)}\n`;
    }
  }

  return summary;
}

export function setDailyLimit(limit: number): void {
  state.dailyLimit = limit;
}

export function getBudgetState(): BudgetState {
  checkAndResetDaily();
  return state;
}
