import Link from 'next/link';
import { Heart } from 'lucide-react';
import { Quote } from '@/types/quote';

interface QuoteCardProps {
  quote: Quote;
  voteCount?: number;
  lang?: 'vi' | 'en';
}

export default function QuoteCard({ quote, voteCount = 0, lang = 'vi' }: QuoteCardProps) {
  return (
    <Link
      href={`/quote/${quote.id}`}
      className="group relative flex flex-col bg-white border-l-4 border-sienna rounded-r-lg p-6 transition-all duration-200 hover:border-gold shadow-card hover:shadow-card-hover"
    >
      {/* Decorative quotemark */}
      <span
        className="absolute top-2 right-4 font-playfair text-6xl text-sienna leading-none select-none pointer-events-none"
        style={{ opacity: 0.15 }}
        aria-hidden="true"
      >
        &ldquo;
      </span>

      {/* Quote text */}
      <p className="font-playfair italic text-base text-ink leading-relaxed line-clamp-3 mb-4 pr-8">
        {lang === 'vi' ? quote.quote_vi : quote.quote_en}
      </p>

      {/* Author */}
      <p className="text-sm font-medium text-ink-muted mb-1">
        — {quote.author}
      </p>

      {/* Source */}
      <p className="text-xs text-ink-faint mb-4 line-clamp-1">{quote.source}</p>

      {/* Footer row */}
      <div className="flex items-center gap-3 mt-auto">
        <span className="flex items-center gap-1 text-xs text-sienna">
          <Heart size={12} />
          {voteCount}
        </span>
        <div className="flex flex-wrap gap-1">
          {quote.category.map(c => (
            <span
              key={c}
              className="text-xs bg-sienna-light text-sienna rounded-full px-2 py-0.5"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
