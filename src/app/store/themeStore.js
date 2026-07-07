import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useThemeStore = create(
  persist(
    (set) => ({
      theme: 'dark',
      toggleTheme: () =>
        set((state) => {
          const next = state.theme === 'dark' ? 'light' : 'dark';
          document.body.classList.toggle('light', next === 'light');
          return { theme: next };
        }),
      setTheme: (theme) => {
        document.body.classList.toggle('light', theme === 'light');
        set({ theme });
      },
    }),
    { name: 'ef-theme' }
  )
);

export const useUIStore = create((set) => ({
  sidebarOpen: true,
  loading: false,
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setLoading: (loading) => set({ loading }),
}));
