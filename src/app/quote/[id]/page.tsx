import { notFound } from 'next/navigation';
import { getAllQuotes, getQuoteById } from '@/lib/quotes';
import { getVoteCounts } from '@/lib/vote';
import UpvoteButton from '@/components/UpvoteButton';
import CopyButton from '@/components/CopyButton';

export async function generateStaticParams() {
  return getAllQuotes().map(q => ({ id: q.id }));
}

interface QuotePageProps {
  params: Promise<{ id: string }>;
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://vquotes.vercel.app';
const REPORT_FORM_URL = 'https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform';

export default async function QuotePage({ params }: QuotePageProps) {
  const { id } = await params;
  const quote = getQuoteById(id);
  if (!quote) notFound();

  const voteCounts = await getVoteCounts([quote.id]);
  const voteCount = voteCounts[quote.id] ?? 0;

  const quoteUrl = `${SITE_URL}/quote/${quote.id}`;
  const reportUrl = `${REPORT_FORM_URL}?entry.QUOTE_ID=${encodeURIComponent(quote.id)}&entry.QUOTE_URL=${encodeURIComponent(quoteUrl)}`;

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="bg-white border rounded-xl p-8 shadow-sm">
        <p className="text-2xl font-medium text-gray-800 leading-relaxed mb-6">
          &ldquo;{quote.quote_vi}&rdquo;
        </p>
        <p className="text-lg text-gray-500 italic leading-relaxed mb-6">
          &ldquo;{quote.quote_en}&rdquo;
        </p>
        <hr className="my-4" />
        <p className="font-semibold text-gray-700">— {quote.author}</p>
        <p className="text-sm text-gray-400 mt-1">{quote.source}{quote.year ? ` (${quote.year})` : ''}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          {quote.category.map(c => (
            <span key={c} className="text-xs bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded">
              {c}
            </span>
          ))}
          {quote.tags.map(t => (
            <span key={t} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">
              #{t}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <UpvoteButton quoteId={quote.id} initialCount={voteCount} />
        <a
          href={reportUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 border rounded-lg text-sm text-gray-600 hover:border-red-300 hover:text-red-500 transition-colors"
        >
          Báo lỗi / Report
        </a>
        <CopyButton url={quoteUrl} />
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(quoteUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 border rounded-lg text-sm text-blue-600 hover:bg-blue-50 transition-colors"
        >
          Chia sẻ Facebook
        </a>
        <a
          href={`https://x.com/intent/tweet?text=${encodeURIComponent(`"${quote.quote_vi}" — ${quote.author}`)}&url=${encodeURIComponent(quoteUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 border rounded-lg text-sm text-sky-600 hover:bg-sky-50 transition-colors"
        >
          Chia sẻ X
        </a>
      </div>

      <p className="text-xs text-gray-400">
        Trích dẫn này đã được xác minh từ nguồn công khai. Nếu có sai sót, vui lòng báo lỗi.
      </p>
    </div>
  );
}
