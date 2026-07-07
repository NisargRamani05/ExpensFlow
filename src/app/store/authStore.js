import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { generateId } from '@/utils/formatters';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email, password) => {
        set({ isLoading: true });
        await new Promise((r) => setTimeout(r, 800));
        const user = {
          uid: generateId(),
          name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
          email,
          photoURL: null,
          currency: 'INR',
          notifications: { email: true, push: true, budgetAlerts: true },
          createdAt: new Date().toISOString(),
        };
        set({ user, isAuthenticated: true, isLoading: false });
        return user;
      },

      signup: async (name, email, password) => {
        set({ isLoading: true });
        await new Promise((r) => setTimeout(r, 800));
        const user = {
          uid: generateId(),
          name,
          email,
          photoURL: null,
          currency: 'INR',
          notifications: { email: true, push: true, budgetAlerts: true },
          createdAt: new Date().toISOString(),
        };
        set({ user, isAuthenticated: true, isLoading: false });
        return user;
      },

      loginWithGoogle: async () => {
        set({ isLoading: true });
        await new Promise((r) => setTimeout(r, 800));
        const user = {
          uid: generateId(),
          name: 'Demo User',
          email: 'demo@gmail.com',
          photoURL: null,
          currency: 'INR',
          notifications: { email: true, push: true, budgetAlerts: true },
          createdAt: new Date().toISOString(),
        };
        set({ user, isAuthenticated: true, isLoading: false });
        return user;
      },

      logout: () => set({ user: null, isAuthenticated: false }),

      updateProfile: (updates) => {
        const { user } = get();
        if (!user) return;
        set({ user: { ...user, ...updates } });
      },
    }),
    { name: 'ef-auth' }
  )
);
