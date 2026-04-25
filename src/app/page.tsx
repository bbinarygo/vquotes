import { getAllQuotes } from '@/lib/quotes';
import QuoteCard from '@/components/QuoteCard';
import SearchBar from '@/components/SearchBar';
import CategoryGrid from '@/components/CategoryGrid';

function SectionHeading({ vi, en }: { vi: string; en: string }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <h2 className="font-playfair text-2xl font-bold text-ink whitespace-nowrap">
        {vi} <span className="text-ink-faint font-normal text-lg">/ {en}</span>
      </h2>
      <div className="flex-1 h-px bg-rule" />
    </div>
  );
}

export default async function HomePage() {
  const { quotes: allQuotes } = await getAllQuotes({ pageSize: 6 });
  const heroQuote = allQuotes[0];
  const featured = allQuotes.slice(0, 6);

  return (
    <div className="space-y-16 md:space-y-24">
      {/* Hero */}
      <section
        className="-mx-4 px-4 py-16 md:py-24 text-center"
        style={{
          background: 'var(--color-parchment)',
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
        }}
      >
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-ink-faint mb-6">
          Kho trích dẫn Việt Nam · Vietnamese Quotes
        </p>
        <h1 className="font-playfair text-5xl md:text-7xl font-bold text-ink leading-tight mb-6">
          Trích dẫn<br />
          <span className="text-sienna italic">Việt Nam</span>
        </h1>
        {heroQuote && (
          <div className="relative max-w-2xl mx-auto mb-10 px-8">
            <span
              className="absolute -top-4 left-0 font-playfair text-8xl text-sienna leading-none select-none"
              style={{ opacity: 0.2 }}
              aria-hidden="true"
            >
              &ldquo;
            </span>
            <p className="font-playfair italic text-lg md:text-xl text-ink-muted leading-relaxed">
              {heroQuote.quote_vi}
            </p>
            <p className="mt-3 text-sm text-ink-faint">— {heroQuote.author}</p>
          </div>
        )}
        <div className="flex justify-center px-4">
          <SearchBar />
        </div>
      </section>

      {/* Featured quotes */}
      <section>
        <SectionHeading vi="Trích dẫn nổi bật" en="Featured Quotes" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map(q => (
            <QuoteCard key={q.id} quote={q} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section>
        <SectionHeading vi="Khám phá theo thể loại" en="Explore by Category" />
        <CategoryGrid />
      </section>
    </div>
  );
}
