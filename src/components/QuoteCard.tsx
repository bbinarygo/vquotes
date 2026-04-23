import Link from 'next/link';
import { Quote } from '@/types/quote';

interface QuoteCardProps {
  quote: Quote;
  voteCount?: number;
  lang?: 'vi' | 'en';
}

export default function QuoteCard({ quote, voteCount = 0, lang = 'vi' }: QuoteCardProps) {
  return (
    <Link href={`/quote/${quote.id}`} className="block border rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
      <p className="text-lg font-medium text-gray-800 mb-2 line-clamp-3">
        {lang === 'vi' ? quote.quote_vi : quote.quote_en}
      </p>
      <p className="text-sm text-gray-500">— {quote.author}</p>
      <p className="text-xs text-gray-400 mt-1">{quote.source}</p>
      <div className="flex items-center gap-2 mt-3">
        <span className="text-xs text-amber-600">▲ {voteCount}</span>
        {quote.category.map(c => (
          <span key={c} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
            {c}
          </span>
        ))}
      </div>
    </Link>
  );
}
