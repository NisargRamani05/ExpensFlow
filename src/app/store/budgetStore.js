import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DEMO_BUDGETS } from '@/utils/constants';
import { generateId, getMonthKey } from '@/utils/formatters';
import { useTransactionStore } from './transactionStore';

export const useBudgetStore = create(
  persist(
    (set, get) => ({
      budgets: DEMO_BUDGETS,
      isLoading: false,

      fetchBudgets: async () => {
        set({ isLoading: true });
        await new Promise((r) => setTimeout(r, 500));
        set({ isLoading: false });
      },

      getBudgetForMonth: (monthKey) => {
        return get().budgets.find((b) => b.month === monthKey);
      },

      createOrUpdateBudget: (monthKey, categories) => {
        const existing = get().budgets.find((b) => b.month === monthKey);
        if (existing) {
          set((s) => ({
            budgets: s.budgets.map((b) =>
              b.month === monthKey ? { ...b, categories } : b
            ),
          }));
        } else {
          set((s) => ({
            budgets: [...s.budgets, { id: generateId(), month: monthKey, categories }],
          }));
        }
      },

      getSpentByCategory: (monthKey) => {
        const txs = useTransactionStore.getState().getFiltered({ monthKey, type: 'expense' });
        const spent = {};
        txs.forEach((t) => {
          spent[t.category] = (spent[t.category] || 0) + t.amount;
        });
        return spent;
      },

      getBudgetProgress: (monthKey) => {
        const budget = get().getBudgetForMonth(monthKey);
        if (!budget) return [];
        const spent = get().getSpentByCategory(monthKey);
        return Object.entries(budget.categories).map(([category, limit]) => ({
          category,
          limit,
          spent: spent[category] || 0,
          percentage: limit > 0 ? Math.min(((spent[category] || 0) / limit) * 100, 100) : 0,
          overspent: (spent[category] || 0) > limit,
        }));
      },

      getTotalBudget: (monthKey) => {
        const budget = get().getBudgetForMonth(monthKey);
        if (!budget) return 0;
        return Object.values(budget.categories).reduce((s, v) => s + v, 0);
      },
    }),
    { name: 'ef-budgets' }
  )
);
