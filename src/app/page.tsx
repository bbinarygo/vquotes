import { getAllQuotes } from '@/lib/quotes';
import { getLang } from '@/lib/lang';
import { t } from '@/lib/i18n';
import { getVoteCounts } from '@/lib/vote';
import QuoteCard from '@/components/QuoteCard';
import SearchBar from '@/components/SearchBar';
import CategoryGrid from '@/components/CategoryGrid';

export default async function HomePage() {
  const lang = await getLang();
  const { quotes: allQuotes } = await getAllQuotes({ pageSize: 6 });
  const heroQuote = allQuotes[0];
  const featured = allQuotes.slice(0, 6);
  const voteCounts = await getVoteCounts(featured.map(q => q.id));

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
          {t('hero_tagline', lang)}
        </p>
        <h1 className="font-playfair text-5xl md:text-7xl font-bold text-ink leading-tight mb-6 tracking-[-0.02em]">
          {t('hero_title_1', lang)}<br />
          <span className="text-sienna italic">{t('hero_title_2', lang)}</span>
        </h1>
        {heroQuote && (
          <div className="relative max-w-2xl mx-auto mb-10 px-8">
            <span
              className="absolute -top-4 left-0 font-playfair text-8xl text-sienna leading-none select-none"
              style={{ opacity: 0.12 }}
              aria-hidden="true"
            >
              &ldquo;
            </span>
            <p className="font-playfair italic text-lg md:text-xl text-ink-muted leading-[1.7]">
              {lang === 'vi' ? heroQuote.quote_vi : heroQuote.quote_en}
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
        <div className="flex items-center gap-4 mb-8">
          <h2 className="font-playfair text-2xl font-bold text-ink whitespace-nowrap">
            {t('heading_featured', lang)}
          </h2>
          <div className="flex-1 h-px bg-rule" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map(q => (
            <QuoteCard key={q.id} quote={q} voteCount={voteCounts[q.id] ?? 0} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section>
        <div className="flex items-center gap-4 mb-8">
          <h2 className="font-playfair text-2xl font-bold text-ink whitespace-nowrap">
            {t('heading_categories', lang)}
          </h2>
          <div className="flex-1 h-px bg-rule" />
        </div>
        <CategoryGrid />
      </section>
    </div>
  );
}
