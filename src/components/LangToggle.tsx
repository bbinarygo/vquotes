'use client';
import { useLanguage } from '@/context/LanguageContext';

export default function LangToggle() {
  const { lang, toggleLang } = useLanguage();

  return (
    <div className="flex border border-sienna rounded-lg overflow-hidden text-xs font-semibold">
      <button
        onClick={() => lang !== 'vi' && toggleLang()}
        aria-pressed={lang === 'vi'}
        className={`px-3 py-1.5 min-h-[44px] transition-colors focus-ring ${
          lang === 'vi'
            ? 'bg-sienna text-cream'
            : 'bg-parchment text-sienna hover:bg-sienna/10'
        }`}
      >
        VI
      </button>
      <button
        onClick={() => lang !== 'en' && toggleLang()}
        aria-pressed={lang === 'en'}
        className={`px-3 py-1.5 min-h-[44px] transition-colors focus-ring ${
          lang === 'en'
            ? 'bg-sienna text-cream'
            : 'bg-parchment text-sienna hover:bg-sienna/10'
        }`}
      >
        EN
      </button>
    </div>
  );
}
