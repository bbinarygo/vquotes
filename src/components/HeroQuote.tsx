'use client';

import { Quote } from '@/types/quote';
import { useLanguage } from '@/context/LanguageContext';

interface HeroQuoteProps {
  quote: Quote;
}

export default function HeroQuote({ quote }: HeroQuoteProps) {
  const { lang } = useLanguage();
  const quoteText = lang === 'vi' ? quote.quote_vi : quote.quote_en;

  return (
    <div className="relative max-w-2xl mx-auto mb-10 px-8">
      <span
        className="absolute -top-4 left-0 font-playfair text-8xl text-sienna leading-none select-none"
        style={{ opacity: 0.12 }}
        aria-hidden="true"
      >
        &ldquo;
      </span>
      <p className="font-playfair italic text-lg md:text-xl text-ink-muted leading-[1.7]">
        {quoteText}
      </p>
      <p className="mt-3 text-sm text-ink-faint">— {quote.author}</p>
    </div>
  );
}
