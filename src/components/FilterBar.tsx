'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, ArrowUpDown } from 'lucide-react';
import { CATEGORY_LIST } from '@/constants/categories';
import { useLanguage } from '@/context/LanguageContext';
import { t } from '@/lib/i18n';

export default function FilterBar() {
  const router = useRouter();
  const params = useSearchParams();
  const { lang } = useLanguage();

  function update(key: string, value: string) {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    next.delete('page');
    router.push(`/browse?${next.toString()}`);
  }

  const activeCategory = params.get('category') ?? '';

  const SORT_OPTIONS = [
    { value: 'newest',     label: t('sort_newest', lang) },
    { value: 'most-voted', label: t('sort_most_voted', lang) },
  ];

  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 md:pb-0 flex-1">
        <button
          onClick={() => update('category', '')}
          className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors min-h-[36px] ${
            activeCategory === ''
              ? 'bg-sienna text-cream border-sienna'
              : 'bg-white text-ink-muted border-rule hover:border-sienna hover:text-sienna'
          }`}
        >
          {t('filter_all', lang)}
        </button>
        {CATEGORY_LIST.map(c => (
          <button
            key={c.value}
            onClick={() => update('category', c.value)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors min-h-[36px] ${
              activeCategory === c.value
                ? 'bg-sienna text-cream border-sienna'
                : 'bg-white text-ink-muted border-rule hover:border-sienna hover:text-sienna'
            }`}
          >
            {lang === 'vi' ? c.labelVi : c.label}
          </button>
        ))}
      </div>
      <div className="flex gap-2 items-center">
        <div className="relative">
          <ArrowUpDown size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint pointer-events-none" />
          <select
            value={params.get('sort') ?? 'newest'}
            onChange={e => update('sort', e.target.value)}
            aria-label={t('sort_label', lang)}
            className="pl-8 pr-3 py-2 bg-white border border-rule rounded-lg text-xs text-ink-muted focus:outline-none focus:border-sienna min-h-[36px] appearance-none"
          >
            {SORT_OPTIONS.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
        <div className="relative flex-1 min-w-32">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint pointer-events-none" />
          <input
            type="text"
            defaultValue={params.get('q') ?? ''}
            placeholder={t('filter_placeholder', lang)}
            aria-label={t('search_placeholder', lang)}
            onKeyDown={e => { if (e.key === 'Enter') update('q', (e.target as HTMLInputElement).value); }}
            className="w-full pl-8 pr-3 py-2 bg-white border border-rule rounded-lg text-xs text-ink placeholder:text-ink-faint focus:outline-none focus:border-sienna min-h-[36px]"
          />
        </div>
      </div>
    </div>
  );
}
