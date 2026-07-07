import { useEffect, useState } from 'react';
import { useThemeStore } from '@/app/store/themeStore';

export function useThemeInit() {
  const theme = useThemeStore((s) => s.theme);

  useEffect(() => {
    document.body.classList.toggle('light', theme === 'light');
  }, [theme]);
}

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false
  );

  useEffect(() => {
    const mq = window.matchMedia(query);
    const handler = (e) => setMatches(e.matches);
    mq.addEventListener('change', handler);
    setMatches(mq.matches);
    return () => mq.removeEventListener('change', handler);
  }, [query]);

  return matches;
}
