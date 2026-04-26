import type { Metadata } from 'next';
import { Playfair_Display, DM_Sans } from 'next/font/google';
import { Suspense } from 'react';
import Link from 'next/link';
import LayoutClientWrapper from '@/components/LayoutClientWrapper';
import MobileNav from '@/components/MobileNav';
import DesktopNav from '@/components/DesktopNav';
import { getLang } from '@/lib/lang';
import { t } from '@/lib/i18n';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'VQuotes — Trích dẫn Việt Nam / Vietnamese Quotes',
  description: 'Cơ sở dữ liệu mở trích dẫn Việt Nam song ngữ. Open database of Vietnamese quotes in Vietnamese and English.',
};

async function FooterContent() {
  const lang = await getLang();
  return (
    <>
      <div>
        <p className="font-playfair text-xl font-bold text-sienna mb-2">VQuotes</p>
        <p className="text-sm text-ink-muted leading-relaxed">
          {t('footer_tagline', lang)}
        </p>
        <span className="inline-block mt-3 text-xs border border-rule rounded px-2 py-0.5 text-ink-faint">
          CC0 — Public Domain
        </span>
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-ink-faint mb-3">
          {t('footer_links', lang)}
        </p>
        <ul className="space-y-2 text-sm text-ink-muted">
          <li><Link href="/browse" className="hover:text-sienna transition-colors">{t('footer_browse', lang)}</Link></li>
          <li><Link href="/contribute" className="hover:text-sienna transition-colors">{t('footer_contribute', lang)}</Link></li>
          <li><Link href="/schema" className="hover:text-sienna transition-colors">Schema</Link></li>
          <li>
            <a href="https://github.com/bbinarygo/vquotes" target="_blank" rel="noopener noreferrer" className="hover:text-sienna transition-colors">
              GitHub →
            </a>
          </li>
        </ul>
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-ink-faint mb-3">
          {t('footer_about', lang)}
        </p>
        <p className="text-xs text-ink-faint leading-relaxed">
          {t('footer_about_text', lang)}
        </p>
      </div>
    </>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`${playfair.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <body className="font-sans bg-cream text-ink min-h-screen">
        <LayoutClientWrapper>
          {/* Header */}
          <header className="sticky top-0 z-40 bg-cream/95 backdrop-blur-sm border-b border-rule">
            <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
              <Link href="/" className="font-playfair text-2xl font-bold text-sienna tracking-tight">
                VQuotes
              </Link>
              {/* Desktop nav */}
              <DesktopNav />
              {/* Mobile hamburger */}
              <MobileNav />
            </div>
          </header>

          {/* Main content */}
          <main className="max-w-5xl mx-auto px-4 py-8 md:py-12">
            {children}
          </main>

          {/* Footer */}
          <footer className="bg-parchment border-t border-rule mt-16 py-12">
            <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
              <Suspense fallback={<div className="h-32" />}>
                <FooterContent />
              </Suspense>
            </div>
          </footer>
        </LayoutClientWrapper>
      </body>
    </html>
  );
}
