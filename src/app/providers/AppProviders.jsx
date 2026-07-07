import { Toaster } from 'react-hot-toast';
import { useThemeInit } from '@/hooks/useTheme';

export function AppProviders({ children }) {
  useThemeInit();

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
