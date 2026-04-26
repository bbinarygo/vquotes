'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LangToggle from '@/components/LangToggle';
import { useLanguage } from '@/context/LanguageContext';
import { t } from '@/lib/i18n';

const NAV_LINKS = [
  { href: '/browse', key: 'nav_browse' as const },
  { href: '/contribute', key: 'nav_contribute' as const },
  { href: '/schema', key: 'nav_schema' as const },
] as const;

export default function DesktopNav() {
  const pathname = usePathname();
  const { lang } = useLanguage();

  return (
    <nav className="hidden md:flex items-center gap-1 text-sm text-ink-muted">
      {NAV_LINKS.map(({ href, key }) => {
        const active = pathname === href || pathname.startsWith(href + '/');
        return (
          <Link
            key={href}
            href={href}
            className={`px-3 py-1.5 rounded-lg transition-colors focus-ring min-h-[44px] flex items-center ${
              active
                ? 'text-sienna font-medium bg-parchment'
                : 'hover:text-sienna hover:bg-parchment'
            }`}
          >
            {t(key, lang)}
          </Link>
        );
      })}
      <span className="w-px h-4 bg-rule mx-1" aria-hidden="true" />
      <LangToggle />
    </nav>
  );
}
