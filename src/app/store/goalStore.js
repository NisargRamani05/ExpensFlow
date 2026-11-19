import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DEMO_GOALS } from '@/utils/constants';
import { generateId } from '@/utils/formatters';
import { useTransactionStore } from './transactionStore';

export const useGoalStore = create(
  persist(
    (set, get) => ({
      goals: DEMO_GOALS,
      isLoading: false,

      fetchGoals: async () => {
        set({ isLoading: true });
        await new Promise((r) => setTimeout(r, 500));
        set({ isLoading: false });
      },

      addGoal: (data) => {
        const goal = { id: generateId(), savedAmount: 0, ...data };
        set((s) => ({ goals: [...s.goals, goal] }));
        return goal;
      },

      updateGoal: (id, updates) => {
        set((s) => ({
          goals: s.goals.map((g) => (g.id === id ? { ...g, ...updates } : g)),
        }));
      },

      deleteGoal: (id) => {
        set((s) => ({ goals: s.goals.filter((g) => g.id !== id) }));
      },

      addToGoal: (id, amount) => {
        const goal = get().goals.find((g) => g.id === id);
        if (!goal) return;

        // Cap the actual amount added to not exceed target
        const actualAmount = Math.min(amount, goal.targetAmount - goal.savedAmount);
        if (actualAmount <= 0) return;

        // Update the goal's saved amount
        set((s) => ({
          goals: s.goals.map((g) =>
            g.id === id ? { ...g, savedAmount: g.savedAmount + actualAmount } : g
          ),
        }));

        // Auto-create an expense transaction so it deducts from total assets
        useTransactionStore.getState().addTransaction({
          type: 'expense',
          amount: actualAmount,
          category: 'Savings Goal',
          note: `Goal: ${goal.title}`,
          date: new Date().toISOString().split('T')[0],
        });
      },

      getTotalSaved: () => get().goals.reduce((s, g) => s + g.savedAmount, 0),
      getTotalTarget: () => get().goals.reduce((s, g) => s + g.targetAmount, 0),
    }),
    { name: 'ef-goals' }
  )
);
