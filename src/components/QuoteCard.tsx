'use client';
import Link from 'next/link';
import { Quote } from '@/types/quote';
import { useLanguage } from '@/context/LanguageContext';
import { CATEGORY_LIST } from '@/constants/categories';

interface QuoteCardProps {
  quote: Quote;
  voteCount?: number;
}

export default function QuoteCard({ quote, voteCount = 0 }: QuoteCardProps) {
  const { lang } = useLanguage();
  const quoteText = lang === 'vi' ? quote.quote_vi : quote.quote_en;

  return (
    <Link
      href={`/quote/${quote.id}`}
      className="group relative flex flex-col bg-white border-l-4 border-sienna rounded-r-lg p-6 transition-[box-shadow,border-color] duration-200 hover:border-gold shadow-card hover:shadow-card-hover cursor-pointer focus-ring"
    >
      <span
        className="absolute top-2 right-4 font-playfair text-6xl text-sienna leading-none select-none pointer-events-none"
        style={{ opacity: 0.08 }}
        aria-hidden="true"
      >
        &ldquo;
      </span>
      <p className="font-playfair italic text-base text-ink leading-[1.7] line-clamp-3 mb-4 pr-8">
        {quoteText}
      </p>
      <hr className="border-rule mb-3" />
      <p className="text-sm font-medium text-ink-muted mb-1">— {quote.author}</p>
      <p className="text-xs text-ink-faint mb-4 line-clamp-1">{quote.source}</p>
      <div className="flex items-center gap-3 mt-auto">
        <span className="text-xs text-sienna font-medium">{voteCount}</span>
        <div className="flex flex-wrap gap-1">
          {quote.category.map(c => {
            const cat = CATEGORY_LIST.find(x => x.value === c);
            const label = cat ? (lang === 'vi' ? cat.labelVi : cat.label) : c;
            return (
              <span key={c} className="text-xs bg-sienna-light text-sienna rounded-full px-2 py-0.5 font-medium">
                {label}
              </span>
            );
          })}
        </div>
      </div>
    </Link>
  );
}
