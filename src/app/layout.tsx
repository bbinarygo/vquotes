import type { Metadata } from 'next';
import { Playfair_Display, DM_Sans } from 'next/font/google';
import Link from 'next/link';
import { LanguageProvider } from '@/context/LanguageContext';
import MobileNav from '@/components/MobileNav';
import LangToggle from '@/components/LangToggle';
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="font-sans bg-cream text-ink min-h-screen">
        <LanguageProvider>
          {/* Header */}
          <header className="sticky top-0 z-40 bg-cream/95 backdrop-blur-sm border-b border-rule">
            <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
              <Link href="/" className="font-playfair text-2xl font-bold text-sienna tracking-tight">
                VQuotes
              </Link>
              {/* Desktop nav */}
              <nav className="hidden md:flex items-center gap-1 text-sm text-ink-muted">
                <Link href="/browse" className="px-3 py-2 hover:text-sienna transition-colors rounded">
                  Khám phá / Browse
                </Link>
                <span className="text-rule mx-1">|</span>
                <Link href="/contribute" className="px-3 py-2 hover:text-sienna transition-colors rounded">
                  Đóng góp / Contribute
                </Link>
                <span className="text-rule mx-1">|</span>
                <LangToggle />
              </nav>
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
              <div>
                <p className="font-playfair text-xl font-bold text-sienna mb-2">VQuotes</p>
                <p className="text-sm text-ink-muted leading-relaxed">
                  Kho trích dẫn Việt Nam song ngữ — mở và miễn phí cho cộng đồng.
                </p>
                <span className="inline-block mt-3 text-xs border border-rule rounded px-2 py-0.5 text-ink-faint">
                  CC0 — Public Domain
                </span>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-ink-faint mb-3">Liên kết</p>
                <ul className="space-y-2 text-sm text-ink-muted">
                  <li><Link href="/browse" className="hover:text-sienna transition-colors">Khám phá trích dẫn</Link></li>
                  <li><Link href="/contribute" className="hover:text-sienna transition-colors">Đóng góp</Link></li>
                  <li><Link href="/schema" className="hover:text-sienna transition-colors">Schema</Link></li>
                  <li>
                    <a href="https://github.com/bbinarygo/vquotes" target="_blank" rel="noopener noreferrer" className="hover:text-sienna transition-colors">
                      GitHub →
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-ink-faint mb-3">Về dự án</p>
                <p className="text-xs text-ink-faint leading-relaxed">
                  Mọi trích dẫn được xác minh từ nguồn công khai. Dự án bảo tồn văn hóa, không phải nền tảng chính trị. Tuân thủ pháp luật Việt Nam.
                </p>
              </div>
            </div>
          </footer>
        </LanguageProvider>
      </body>
    </html>
  );
}
