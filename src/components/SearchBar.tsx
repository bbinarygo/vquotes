'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { t } from '@/lib/i18n';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const { lang } = useLanguage();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/browse?q=${encodeURIComponent(query.trim())}`);
    }
  }

  return (
    <form onSubmit={handleSearch} className="flex gap-2 w-full max-w-2xl">
      <div className="relative flex-1">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-faint pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder={t('search_placeholder', lang)}
          className="w-full pl-11 pr-4 py-3 bg-white border border-rule rounded-lg text-base text-ink placeholder:text-ink-faint focus:outline-none focus:border-sienna transition-colors"
        />
      </div>
      <button
        type="submit"
        className="px-6 py-3 bg-sienna text-cream rounded-lg hover:bg-gold transition-colors font-medium text-sm whitespace-nowrap min-h-[44px]"
      >
        {t('btn_search', lang)}
      </button>
    </form>
  );
}
