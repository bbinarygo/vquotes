'use client';
import { Flag } from 'lucide-react';
import UpvoteButton from '@/components/UpvoteButton';
import CopyButton from '@/components/CopyButton';
import { useLanguage } from '@/context/LanguageContext';
import { t } from '@/lib/i18n';

interface MobileActionBarProps {
  quoteId: number;
  voteCount: number;
  reportUrl: string;
  facebookUrl: string;
  xUrl: string;
  quoteUrl: string;
}

export default function MobileActionBar({
  quoteId,
  voteCount,
  reportUrl,
  facebookUrl,
  xUrl,
  quoteUrl,
}: MobileActionBarProps) {
  const { lang } = useLanguage();
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-30 bg-cream/95 backdrop-blur-sm border-t border-rule flex items-center justify-around px-4 py-3 md:hidden"
      style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
    >
      <UpvoteButton quoteId={quoteId} initialCount={voteCount} />
      <CopyButton url={quoteUrl} />
      <a
        href={reportUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t('aria_report', lang)}
        className="flex items-center gap-1.5 px-3 py-2.5 border border-rule rounded-full text-sm text-ink-muted hover:border-sienna hover:text-sienna transition-colors min-h-[44px]"
      >
        <Flag size={15} />
        <span className="hidden xs:inline">{t('btn_report', lang)}</span>
      </a>
      <a
        href={facebookUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t('aria_facebook', lang)}
        className="flex items-center justify-center w-11 h-11 rounded-full border border-rule text-blue-600 hover:bg-blue-50 transition-colors"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
      </a>
      <a
        href={xUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t('aria_x', lang)}
        className="flex items-center justify-center w-11 h-11 rounded-full border border-rule text-ink hover:bg-parchment transition-colors"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
      </a>
    </div>
  );
}
