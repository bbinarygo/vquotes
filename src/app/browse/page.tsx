import { Suspense } from 'react';
import Link from 'next/link';
import { getAllQuotes } from '@/lib/quotes';
import { getVoteCounts } from '@/lib/vote';
import { getLang } from '@/lib/lang';
import { t } from '@/lib/i18n';
import QuoteCard from '@/components/QuoteCard';
import FilterBar from '@/components/FilterBar';
import Breadcrumb from '@/components/Breadcrumb';
import { BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';

const PAGE_SIZE = 20;

interface BrowseProps {
  searchParams: Promise<{ category?: string; q?: string; sort?: string; page?: string }>;
}

async function BrowseContent({ searchParams }: BrowseProps) {
  const lang = await getLang();
  const params = await searchParams;
  const { category, q, sort = 'newest', page = '1' } = params;
  const currentPage = Math.max(1, parseInt(page, 10) || 1);

  const validSort = (sort === 'newest' || sort === 'oldest' || sort === 'most-voted')
    ? sort
    : 'newest';

  const { quotes: allQuotes, total } = await getAllQuotes({
    category,
    q,
    sort: validSort,
    page: validSort === 'most-voted' ? 1 : currentPage,
    pageSize: validSort === 'most-voted' ? 10000 : PAGE_SIZE,
  });

  let quotes = allQuotes;
  let allVoteCounts: Record<string, number> = {};
  let displayTotal = total;

  if (validSort === 'most-voted') {
    allVoteCounts = await getVoteCounts(allQuotes.map(qt => qt.id));
    const sorted = [...allQuotes].sort(
      (a, b) => (allVoteCounts[b.id] ?? 0) - (allVoteCounts[a.id] ?? 0)
    );
    displayTotal = sorted.length;
    quotes = sorted.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  }

  const totalPages = Math.ceil(displayTotal / PAGE_SIZE);

  const voteCounts = validSort === 'most-voted'
    ? Object.fromEntries(quotes.map(qt => [qt.id, allVoteCounts[qt.id] ?? 0]))
    : await getVoteCounts(quotes.map(qt => qt.id));

  const buildUrl = (p: number) => {
    const next = new URLSearchParams({
      ...(category ? { category } : {}),
      ...(q ? { q } : {}),
      sort,
      page: String(p),
    });
    return `/browse?${next.toString()}`;
  };

  return (
    <div className="space-y-6">
      <Breadcrumb items={[
        { label: lang === 'vi' ? 'Trang chủ' : 'Home', href: '/' },
        { label: t('browse_title', lang) },
      ]} />

      <div className="flex items-baseline justify-between">
        <h1 className="font-playfair text-3xl font-bold text-ink">{t('browse_title', lang)}</h1>
        <p className="text-sm text-ink-faint">{displayTotal} {t('browse_count', lang)}</p>
      </div>

      <div className="sticky top-16 z-10 -mx-4 px-4 py-3 bg-cream/95 backdrop-blur-sm border-b border-rule">
        <Suspense>
          <FilterBar />
        </Suspense>
      </div>

      {quotes.length === 0 && (
        <div className="flex flex-col items-center gap-4 py-24 text-center">
          <BookOpen size={48} className="text-ink-faint opacity-40" />
          <p className="font-playfair text-xl text-ink-muted">{t('no_quotes_found', lang)}</p>
          <p className="text-sm text-ink-faint">{t('no_quotes_sub', lang)}</p>
          <Link
            href="/browse"
            className="mt-2 px-4 py-2 border border-sienna text-sienna rounded-lg text-sm hover:bg-sienna hover:text-cream transition-colors"
          >
            {t('clear_filters', lang)}
          </Link>
        </div>
      )}

      {quotes.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {quotes.map(quote => (
            <QuoteCard key={quote.id} quote={quote} voteCount={voteCounts[quote.id] ?? 0} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 pt-6">
          {currentPage > 1 ? (
            <Link
              href={buildUrl(currentPage - 1)}
              className="flex items-center gap-1 px-4 py-2 border border-rule rounded-lg text-sm text-ink-muted hover:border-sienna hover:text-sienna transition-colors min-h-[44px]"
            >
              <ChevronLeft size={16} /> {t('page_prev', lang)}
            </Link>
          ) : (
            <span className="flex items-center gap-1 px-4 py-2 border border-rule rounded-lg text-sm text-ink-faint opacity-40 min-h-[44px] cursor-not-allowed">
              <ChevronLeft size={16} /> {t('page_prev', lang)}
            </span>
          )}
          <span className="text-sm text-ink-muted font-medium">{currentPage} / {totalPages}</span>
          {currentPage < totalPages ? (
            <Link
              href={buildUrl(currentPage + 1)}
              className="flex items-center gap-1 px-4 py-2 border border-rule rounded-lg text-sm text-ink-muted hover:border-sienna hover:text-sienna transition-colors min-h-[44px]"
            >
              {t('page_next', lang)} <ChevronRight size={16} />
            </Link>
          ) : (
            <span className="flex items-center gap-1 px-4 py-2 border border-rule rounded-lg text-sm text-ink-faint opacity-40 min-h-[44px] cursor-not-allowed">
              {t('page_next', lang)} <ChevronRight size={16} />
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export default function BrowsePage(props: BrowseProps) {
  return (
    <Suspense fallback={<div className="text-ink-faint py-12 text-center">{/* Loading handled by Suspense */}</div>}>
      <BrowseContent {...props} />
    </Suspense>
  );
}
