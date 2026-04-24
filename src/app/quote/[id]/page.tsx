import { notFound } from 'next/navigation';
import { Flag, ShieldCheck } from 'lucide-react';
import { getAllQuotes, getQuoteById } from '@/lib/quotes';
import { getVoteCounts } from '@/lib/vote';
import UpvoteButton from '@/components/UpvoteButton';
import CopyButton from '@/components/CopyButton';
import MobileActionBar from '@/components/MobileActionBar';

export async function generateStaticParams() {
  return getAllQuotes().map(q => ({ id: q.id }));
}

interface QuotePageProps {
  params: Promise<{ id: string }>;
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://vquotes.vercel.app';
const REPORT_FORM_URL = 'https://forms.gle/um8zQvheDqpPVRCBA';

export default async function QuotePage({ params }: QuotePageProps) {
  const { id } = await params;
  const quote = getQuoteById(id);
  if (!quote) notFound();

  const voteCounts = await getVoteCounts([quote.id]);
  const voteCount = voteCounts[quote.id] ?? 0;

  const quoteUrl = `${SITE_URL}/quote/${quote.id}`;
  const reportUrl = `${REPORT_FORM_URL}?entry.QUOTE_ID=${encodeURIComponent(quote.id)}&entry.QUOTE_URL=${encodeURIComponent(quoteUrl)}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(quoteUrl)}`;
  const xUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(`"${quote.quote_vi}" — ${quote.author}`)}&url=${encodeURIComponent(quoteUrl)}`;

  return (
    <>
      {/* Extra bottom padding on mobile so content isn't hidden behind the action bar */}
      <div className="max-w-2xl mx-auto space-y-8 pb-24 md:pb-0">

        {/* Quote block */}
        <div className="relative bg-white border-l-4 border-sienna rounded-r-xl px-8 pt-10 pb-8 shadow-card">
          {/* Decorative quotemark */}
          <span
            className="absolute top-4 left-6 font-playfair text-8xl text-sienna leading-none select-none pointer-events-none"
            style={{ opacity: 0.15 }}
            aria-hidden="true"
          >
            &ldquo;
          </span>

          {/* Vietnamese */}
          <p className="font-playfair italic text-2xl md:text-3xl text-ink leading-relaxed mb-6 relative z-10">
            {quote.quote_vi}
          </p>

          {/* VI / EN divider */}
          <div className="relative flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-rule" />
            <span className="text-xs font-medium text-ink-faint tracking-widest">VI · EN</span>
            <div className="flex-1 h-px bg-rule" />
          </div>

          {/* English */}
          <p className="font-sans italic text-base md:text-lg text-ink-muted leading-relaxed mb-6">
            {quote.quote_en}
          </p>

          <hr className="border-rule mb-4" />

          {/* Author */}
          <p className="text-sm font-semibold uppercase tracking-wider text-sienna mb-1">
            —— {quote.author}
          </p>
          <p className="text-sm text-ink-faint">
            {quote.source}{quote.year ? ` · ${quote.year}` : ''}
          </p>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mt-4">
            {quote.category.map(c => (
              <span key={c} className="text-xs bg-sienna-light text-sienna rounded-full px-3 py-0.5">
                {c}
              </span>
            ))}
            {quote.tags.map(t => (
              <span key={t} className="text-xs bg-parchment text-ink-muted rounded-full px-3 py-0.5">
                #{t}
              </span>
            ))}
          </div>
        </div>

        {/* Desktop action bar */}
        <div className="hidden md:flex flex-wrap gap-3 items-center">
          <UpvoteButton quoteId={quote.id} initialCount={voteCount} />
          <CopyButton url={quoteUrl} />
          <a
            href={reportUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 border border-rule rounded-full text-sm text-ink-muted hover:border-red-300 hover:text-red-500 transition-colors min-h-[44px]"
          >
            <Flag size={15} /> Báo lỗi
          </a>
          <a
            href={facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-11 h-11 rounded-full border border-rule text-blue-600 hover:bg-blue-50 transition-colors"
            aria-label="Chia sẻ Facebook"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          </a>
          <a
            href={xUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-11 h-11 rounded-full border border-rule text-ink hover:bg-parchment transition-colors"
            aria-label="Chia sẻ X"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
        </div>

        {/* Verification note */}
        <div className="flex items-center gap-2 text-xs text-ink-faint">
          <ShieldCheck size={14} />
          <span>Trích dẫn đã được xác minh từ nguồn công khai. Nếu có sai sót, vui lòng báo lỗi.</span>
        </div>
      </div>

      {/* Mobile sticky action bar */}
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
