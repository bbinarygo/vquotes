'use client';
import { useLanguage } from '@/context/LanguageContext';

export default function LangToggle() {
  const { lang, toggleLang } = useLanguage();

  return (
    <button
      onClick={toggleLang}
      aria-label={lang === 'vi' ? 'Switch to English' : 'Chuyển sang tiếng Việt'}
      className="flex items-center gap-1 px-2 py-1 rounded text-xs font-medium min-h-[36px] transition-colors"
    >
      <span className={lang === 'vi' ? 'text-sienna font-semibold' : 'text-ink-faint'}>VI</span>
      <span className="text-ink-faint">|</span>
      <span className={lang === 'en' ? 'text-sienna font-semibold' : 'text-ink-faint'}>EN</span>
    </button>
  );
}
