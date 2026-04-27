import { notFound } from 'next/navigation';
import { Flag, ShieldCheck, ExternalLink } from 'lucide-react';
import { getAllQuotes, getQuoteById } from '@/lib/quotes';
import { getVoteCounts } from '@/lib/vote';
import { getLang } from '@/lib/lang';
import { t } from '@/lib/i18n';
import UpvoteButton from '@/components/UpvoteButton';
import CopyButton from '@/components/CopyButton';
import MobileActionBar from '@/components/MobileActionBar';
import QuoteDetailBadges from '@/components/QuoteDetailBadges';
import Breadcrumb from '@/components/Breadcrumb';

export async function generateStaticParams() {
  const { quotes } = await getAllQuotes({ pageSize: 10000 });
  return quotes.map(q => ({ id: String(q.id) }));
}

interface QuotePageProps {
  params: Promise<{ id: string }>;
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://vquotes.vercel.app';
const REPORT_FORM_URL = 'https://forms.gle/um8zQvheDqpPVRCBA';

export default async function QuotePage({ params }: QuotePageProps) {
  const lang = await getLang();
  const { id } = await params;
  const quoteId = parseInt(id, 10);
  if (isNaN(quoteId)) notFound();

  const quote = await getQuoteById(quoteId);
  if (!quote) notFound();

  const voteCounts = await getVoteCounts([quote.id]);
  const voteCount = voteCounts[quote.id] ?? 0;

  const quoteUrl = `${SITE_URL}/quote/${quote.id}`;
  const reportUrl = `${REPORT_FORM_URL}?entry.QUOTE_ID=${encodeURIComponent(String(quote.id))}&entry.QUOTE_URL=${encodeURIComponent(quoteUrl)}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(quoteUrl)}`;
  const xUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(`"${quote.quote_vi}" — ${quote.author}`)}&url=${encodeURIComponent(quoteUrl)}`;

  return (
    <>
      <Breadcrumb items={[
        { label: t('breadcrumb_home', lang), href: '/' },
        { label: t('breadcrumb_browse', lang), href: '/browse' },
        { label: quote.author },
      ]} />

      <div className="max-w-2xl mx-auto space-y-8 pb-24 md:pb-0">
        {/* Quote block */}
        <div className="relative bg-white border-l-4 border-sienna rounded-r-xl px-8 pt-10 pb-8 shadow-card">
          <span
            className="absolute top-2 right-3 font-playfair text-8xl text-sienna leading-none select-none pointer-events-none"
            style={{ opacity: 0.08 }}
            aria-hidden="true"
          >
            &ldquo;
          </span>
          {/* Vietnamese (always first) */}
          <p className="font-playfair italic text-2xl md:text-3xl text-ink leading-[1.75] mb-6 relative z-10 max-w-[55ch]">
            {quote.quote_vi}
          </p>
          <div className="relative flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-rule" />
            <span className="text-xs font-medium text-ink-faint tracking-widest">
              {t('detail_vi_en_divider', lang)}
            </span>
            <div className="flex-1 h-px bg-rule" />
          </div>
          {/* English */}
          <p className="font-sans italic text-base md:text-lg text-ink-muted leading-[1.70] mb-6 max-w-[60ch]">
            {quote.quote_en}
          </p>
          <hr className="border-rule mb-4" />
          <p className="text-sm font-semibold uppercase tracking-[0.1em] text-sienna mb-1">
            — {quote.author}
          </p>
          <QuoteDetailBadges categories={quote.category} tags={quote.tags} />
        </div>

        {/* Source card */}
        <div className="bg-parchment border border-rule rounded-lg p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-faint mb-3">
            {t('detail_source_label', lang)}
          </p>
          <p className="text-sm text-ink-muted">
            {quote.source}{quote.year ? ` · ${quote.year}` : ''}
          </p>
          {quote.source_url && (
            <a
              href={quote.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 mt-2 min-h-[32px] text-sm text-sienna hover:underline focus-ring rounded"
            >
              <ExternalLink size={13} />
              {t('detail_view_source', lang)}
            </a>
          )}
        </div>

        {/* Desktop action bar */}
        <div className="hidden md:flex flex-wrap gap-3 items-center">
          <UpvoteButton quoteId={quote.id} initialCount={voteCount} />
          <CopyButton url={quoteUrl} />
          <a
            href={reportUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 border border-rule rounded-full text-sm text-ink-muted hover:border-red-300 hover:text-red-500 transition-colors min-h-[44px] focus-ring"
          >
            <Flag size={15} /> {t('btn_report', lang)}
          </a>
          <a
            href={facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-11 h-11 rounded-full border border-rule text-blue-600 hover:bg-blue-50 transition-colors focus-ring"
            aria-label={t('aria_facebook', lang)}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          </a>
          <a
            href={xUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-11 h-11 rounded-full border border-rule text-ink hover:bg-parchment transition-colors focus-ring"
            aria-label={t('aria_x', lang)}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
        </div>

        {/* Verification note */}
        <div className="flex items-center gap-2 text-xs text-ink-faint">
          <ShieldCheck size={14} aria-hidden="true" />
          <span>{t('detail_verified', lang)}</span>
        </div>
      </div>

      <MobileActionBar
        quoteId={quote.id}
        voteCount={voteCount}
        reportUrl={reportUrl}
        facebookUrl={facebookUrl}
        xUrl={xUrl}
        quoteUrl={quoteUrl}
      />
    </>
  );
}
