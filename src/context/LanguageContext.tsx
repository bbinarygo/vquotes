'use client';
import { createContext, useContext, useState } from 'react';
import type { Lang } from '@/lib/i18n';

interface LanguageContextValue {
  lang: Lang;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'vi',
  toggleLang: () => {},
});

function getInitialLang(): Lang {
  if (typeof window === 'undefined') return 'vi';
  const stored = localStorage.getItem('vquotes-lang');
  return stored === 'vi' || stored === 'en' ? stored : 'vi';
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>(getInitialLang);

  function toggleLang() {
    const next: Lang = lang === 'vi' ? 'en' : 'vi';
    setLang(next);
    localStorage.setItem('vquotes-lang', next);
    document.cookie = `vquotes-lang=${next}; path=/; SameSite=Lax; max-age=31536000`;
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
