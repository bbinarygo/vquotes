'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import LangToggle from '@/components/LangToggle';
import { useLanguage } from '@/context/LanguageContext';
import { t } from '@/lib/i18n';

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const { lang } = useLanguage();

  return (
    <div className="md:hidden flex items-center gap-2">
      <LangToggle />
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? t('nav_close', lang) : t('nav_open', lang)}
        className="flex items-center justify-center w-11 h-11 text-ink-muted hover:text-sienna transition-colors focus-ring rounded-lg"
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-20"
            onClick={() => setOpen(false)}
          />
          <nav className="absolute top-16 left-0 right-0 z-30 bg-cream border-b border-rule shadow-card px-6 py-2 flex flex-col">
            <Link
              href="/browse"
              onClick={() => setOpen(false)}
              className="flex items-center min-h-[44px] text-base text-ink-muted hover:text-sienna transition-colors border-b border-rule focus-ring"
            >
              {t('nav_browse', lang)}
            </Link>
            <Link
              href="/contribute"
              onClick={() => setOpen(false)}
              className="flex items-center min-h-[44px] text-base text-ink-muted hover:text-sienna transition-colors border-b border-rule focus-ring"
            >
              {t('nav_contribute', lang)}
            </Link>
            <Link
              href="/schema"
              onClick={() => setOpen(false)}
              className="flex items-center min-h-[44px] text-base text-ink-muted hover:text-sienna transition-colors focus-ring"
            >
              {t('nav_schema', lang)}
            </Link>
          </nav>
        </>
      )}
    </div>
  );
}
