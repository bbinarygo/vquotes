'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import type { Lang } from '@/lib/i18n';

interface LanguageContextValue {
  lang: Lang;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'vi',
  toggleLang: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('vi');

  useEffect(() => {
    const stored = localStorage.getItem('vquotes-lang');
    if (stored === 'vi' || stored === 'en') setLang(stored);
  }, []);

  function toggleLang() {
    const next: Lang = lang === 'vi' ? 'en' : 'vi';
    setLang(next);
    localStorage.setItem('vquotes-lang', next);
  }

  return (
    <LanguageContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  return useContext(LanguageContext);
}
