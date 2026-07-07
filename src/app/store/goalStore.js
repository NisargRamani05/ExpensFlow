import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DEMO_GOALS } from '@/utils/constants';
import { generateId } from '@/utils/formatters';

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
        set((s) => ({
          goals: s.goals.map((g) =>
            g.id === id ? { ...g, savedAmount: Math.min(g.savedAmount + amount, g.targetAmount) } : g
          ),
        }));
      },

      getTotalSaved: () => get().goals.reduce((s, g) => s + g.savedAmount, 0),
      getTotalTarget: () => get().goals.reduce((s, g) => s + g.targetAmount, 0),
    }),
    { name: 'ef-goals' }
  )
);
