import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DEMO_TRANSACTIONS } from '@/utils/constants';
import { generateId, getMonthKey } from '@/utils/formatters';

export const useTransactionStore = create(
  persist(
    (set, get) => ({
      transactions: DEMO_TRANSACTIONS,
      isLoading: false,
      initialized: false,

      fetchTransactions: async () => {
        set({ isLoading: true });
        await new Promise((r) => setTimeout(r, 600));
        set({ isLoading: false, initialized: true });
      },

      addTransaction: (data) => {
        const transaction = { id: generateId(), ...data };
        set((s) => ({ transactions: [transaction, ...s.transactions] }));
        return transaction;
      },

      updateTransaction: (id, updates) => {
        set((s) => ({
          transactions: s.transactions.map((t) => (t.id === id ? { ...t, ...updates } : t)),
        }));
      },

      deleteTransaction: (id) => {
        set((s) => ({ transactions: s.transactions.filter((t) => t.id !== id) }));
      },

      getFiltered: ({ type, category, search, monthKey } = {}) => {
        let result = get().transactions;
        if (type && type !== 'all') result = result.filter((t) => t.type === type);
        if (category && category !== 'all') result = result.filter((t) => t.category === category);
        if (search) {
          const q = search.toLowerCase();
          result = result.filter(
            (t) => t.note?.toLowerCase().includes(q) || t.category.toLowerCase().includes(q)
          );
        }
        if (monthKey) {
          result = result.filter((t) => getMonthKey(t.date) === monthKey);
        }
        return result.sort((a, b) => new Date(b.date) - new Date(a.date));
      },

      getStats: (monthKey) => {
        const txs = get().getFiltered({ monthKey });
        const income = txs.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0);
        const expense = txs.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
        return { income, expense, balance: income - expense, count: txs.length };
      },

      getCategoryBreakdown: (monthKey) => {
        const txs = get().getFiltered({ monthKey, type: 'expense' });
        const map = {};
        txs.forEach((t) => {
          map[t.category] = (map[t.category] || 0) + t.amount;
        });
        return Object.entries(map)
          .map(([name, value]) => ({ name, value }))
          .sort((a, b) => b.value - a.value);
      },

      getMonthlyTrend: (months = 6) => {
        const all = get().transactions;
        const result = [];
        const now = new Date();
        for (let i = months - 1; i >= 0; i--) {
          const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
          const key = getMonthKey(d);
          const txs = all.filter((t) => getMonthKey(t.date) === key);
          result.push({
            month: d.toLocaleDateString('en-IN', { month: 'short' }),
            income: txs.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0),
            expense: txs.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0),
          });
        }
        return result;
      },
    }),
    { name: 'ef-transactions' }
  )
);
