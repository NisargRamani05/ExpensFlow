import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { useThemeInit } from '@/hooks/useTheme';
import { authService } from '@/services/auth.service';

export function AppProviders({ children }) {
  useThemeInit();

  // Listen for Firebase auth state changes and keep Zustand store in sync
  useEffect(() => {
    let unsubscribe = () => {};
    const result = authService.onAuthStateChanged(() => {});
    if (result && typeof result.then === 'function') {
      result.then((unsub) => {
        if (unsub) unsubscribe = unsub;
      });
    }
    return () => unsubscribe();
  }, []);

  return (
    <>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#111827',
            color: '#F9FAFB',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '12px',
          },
          success: { iconTheme: { primary: '#22C55E', secondary: '#111827' } },
          error: { iconTheme: { primary: '#EF4444', secondary: '#111827' } },
        }}
      />
    </>
  );
}
