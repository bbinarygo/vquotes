'use client';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { X } from 'lucide-react';
import { CATEGORY_LIST } from '@/constants/categories';
import { useLanguage } from '@/context/LanguageContext';
import { t } from '@/lib/i18n';

export default function CategorySidebar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const router = useRouter();
  const params = useSearchParams();
  const { lang } = useLanguage();
  const activeCategory = params.get('category') ?? '';

  function selectCategory(value: string) {
    const next = new URLSearchParams(params.toString());
    if (value) next.set('category', value);
    else next.delete('category');
    next.delete('page');
    router.push(`/browse?${next.toString()}`);
    setDrawerOpen(false);
  }

  const allItems = [
    { value: '', labelVi: t('sidebar_all', lang), label: t('sidebar_all', lang) },
    ...CATEGORY_LIST,
  ];

  return (
    <>
      {/* Desktop sticky sidebar */}
      <aside className="hidden md:block w-40 flex-shrink-0">
        <div className="sticky top-20 bg-white border border-rule rounded-lg overflow-hidden max-h-[calc(100vh-88px)] overflow-y-auto">
          <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-ink-faint border-b border-rule bg-parchment">
            {t('sidebar_categories', lang)}
          </div>
          {allItems.map(item => {
            const active = activeCategory === item.value;
            const label = lang === 'vi' ? item.labelVi : item.label;
            return (
              <button
                key={item.value}
                onClick={() => selectCategory(item.value)}
                className={`w-full text-left px-3 py-2 text-sm flex items-center justify-between border-b border-rule/50 last:border-b-0 transition-colors min-h-[40px] focus-ring cursor-pointer [touch-action:manipulation] ${
                  active
                    ? 'text-sienna font-semibold bg-parchment border-r-2 border-r-sienna'
                    : 'text-ink-muted hover:bg-parchment hover:text-sienna hover:pl-3.5'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </aside>

      {/* Mobile: filter button + slide-in drawer */}
      <div className="md:hidden">
        <button
          onClick={() => setDrawerOpen(true)}
          className="flex items-center gap-2 px-3 py-2 border border-rule rounded-lg text-sm text-ink-muted hover:border-sienna hover:text-sienna transition-colors min-h-[44px] focus-ring cursor-pointer [touch-action:manipulation]"
        >
          {t('filter_loc', lang)}
          {activeCategory && (
            <span className="ml-1 w-4 h-4 flex items-center justify-center bg-sienna text-cream text-[9px] rounded-full font-bold">
              1
            </span>
          )}
        </button>
      </div>

      {/* Mobile drawer */}
      {drawerOpen && (
        <>
          <div
            className="fixed inset-0 bg-ink/35 z-30"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-60 z-40 bg-white flex flex-col shadow-xl">
            <div className="flex items-center justify-between px-4 py-3 border-b border-rule bg-parchment">
              <span className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                {t('sidebar_categories', lang)}
              </span>
              <button
                onClick={() => setDrawerOpen(false)}
                aria-label={t('nav_close', lang)}
                className="w-8 h-8 flex items-center justify-center text-ink-faint hover:text-ink transition-colors focus-ring rounded [touch-action:manipulation]"
              >
                <X size={16} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {allItems.map(item => {
                const active = activeCategory === item.value;
                const label = lang === 'vi' ? item.labelVi : item.label;
                return (
                  <button
                    key={item.value}
                    onClick={() => selectCategory(item.value)}
                    className={`w-full text-left px-4 py-3 text-sm flex items-center justify-between border-b border-rule/50 last:border-b-0 transition-colors min-h-[44px] focus-ring cursor-pointer [touch-action:manipulation] ${
                      active
                        ? 'text-sienna font-semibold bg-parchment border-r-2 border-r-sienna'
                        : 'text-ink-muted hover:bg-parchment hover:text-sienna'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
            <div className="p-3 border-t border-rule">
              <button
                onClick={() => setDrawerOpen(false)}
                className="w-full bg-sienna text-cream rounded-lg py-3 text-sm font-semibold min-h-[44px] hover:bg-gold transition-colors focus-ring cursor-pointer [touch-action:manipulation]"
              >
                {t('filter_apply', lang)}
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
