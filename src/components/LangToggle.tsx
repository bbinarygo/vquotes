'use client';
import { useLanguage } from '@/context/LanguageContext';

export default function LangToggle() {
  const { lang, toggleLang } = useLanguage();

  return (
    <button
      onClick={toggleLang}
      aria-label={lang === 'vi' ? 'Switch to English' : 'Chuyển sang tiếng Việt'}
      className="flex items-center justify-center px-3 py-1.5 rounded-lg border text-xs font-semibold min-h-[44px] transition-colors focus-ring border-sienna text-sienna bg-parchment hover:bg-sienna hover:text-cream"
    >
      {lang === 'vi' ? 'VI' : 'EN'}
    </button>
  );
}
