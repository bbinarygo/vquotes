import { Suspense } from 'react';
import Link from 'next/link';
import { getAllQuotes } from '@/lib/quotes';
import { getVoteCounts } from '@/lib/vote';
import QuoteCard from '@/components/QuoteCard';
import FilterBar from '@/components/FilterBar';
import { QuoteCategory } from '@/types/quote';
import { BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';

const PAGE_SIZE = 20;

interface BrowseProps {
  searchParams: Promise<{ category?: string; q?: string; sort?: string; page?: string }>;
}

async function BrowseContent({ searchParams }: BrowseProps) {
  const params = await searchParams;
  const { category, q, sort = 'newest', page = '1' } = params;
  const currentPage = Math.max(1, parseInt(page));

  let quotes = getAllQuotes();

  if (category) {
    quotes = quotes.filter(quote => quote.category.includes(category as QuoteCategory));
  }
  if (q) {
    const lower = q.toLowerCase();
    quotes = quotes.filter(quote =>
      quote.quote_vi.toLowerCase().includes(lower) ||
      quote.quote_en.toLowerCase().includes(lower) ||
      quote.author.toLowerCase().includes(lower)
    );
  }

  let allVoteCounts: Record<string, number> = {};
  if (sort === 'most-voted') {
    allVoteCounts = await getVoteCounts(quotes.map(quote => quote.id));
    quotes = quotes.sort((a, b) => (allVoteCounts[b.id] ?? 0) - (allVoteCounts[a.id] ?? 0));
  } else {
    quotes = quotes.sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
  }

  const total = quotes.length;
  const totalPages = Math.ceil(total / PAGE_SIZE);
  const paginated = quotes.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const voteCounts = sort === 'most-voted'
    ? Object.fromEntries(paginated.map(qt => [qt.id, allVoteCounts[qt.id] ?? 0]))
    : await getVoteCounts(paginated.map(quote => quote.id));

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
      {/* Header row */}
      <div className="flex items-baseline justify-between">
        <h1 className="font-playfair text-3xl font-bold text-ink">Khám phá</h1>
        <p className="text-sm text-ink-faint">{total} trích dẫn</p>
      </div>

      {/* Sticky filter bar */}
      <div className="sticky top-16 z-10 -mx-4 px-4 py-3 bg-cream/95 backdrop-blur-sm border-b border-rule">
        <Suspense>
          <FilterBar />
        </Suspense>
      </div>

      {/* Empty state */}
      {paginated.length === 0 && (
        <div className="flex flex-col items-center gap-4 py-24 text-center">
          <BookOpen size={48} className="text-ink-faint opacity-40" />
          <p className="font-playfair text-xl text-ink-muted">Không tìm thấy trích dẫn nào.</p>
          <p className="text-sm text-ink-faint">No quotes found matching your filters.</p>
          <Link
            href="/browse"
            className="mt-2 px-4 py-2 border border-sienna text-sienna rounded-lg text-sm hover:bg-sienna hover:text-cream transition-colors"
          >
            Xoá bộ lọc / Clear filters
          </Link>
        </div>
      )}

      {/* Grid */}
      {paginated.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {paginated.map(quote => (
            <QuoteCard key={quote.id} quote={quote} voteCount={voteCounts[quote.id] ?? 0} />
          ))}
        </div>
      )}

      {/* Prev/next pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 pt-6">
          {currentPage > 1 ? (
            <Link
              href={buildUrl(currentPage - 1)}
              className="flex items-center gap-1 px-4 py-2 border border-rule rounded-lg text-sm text-ink-muted hover:border-sienna hover:text-sienna transition-colors min-h-[44px]"
            >
              <ChevronLeft size={16} /> Trang trước
            </Link>
          ) : (
            <span className="flex items-center gap-1 px-4 py-2 border border-rule rounded-lg text-sm text-ink-faint opacity-40 min-h-[44px] cursor-not-allowed">
              <ChevronLeft size={16} /> Trang trước
            </span>
          )}

          <span className="text-sm text-ink-muted font-medium">
            {currentPage} / {totalPages}
          </span>

          {currentPage < totalPages ? (
            <Link
              href={buildUrl(currentPage + 1)}
              className="flex items-center gap-1 px-4 py-2 border border-rule rounded-lg text-sm text-ink-muted hover:border-sienna hover:text-sienna transition-colors min-h-[44px]"
            >
              Trang sau <ChevronRight size={16} />
            </Link>
          ) : (
            <span className="flex items-center gap-1 px-4 py-2 border border-rule rounded-lg text-sm text-ink-faint opacity-40 min-h-[44px] cursor-not-allowed">
              Trang sau <ChevronRight size={16} />
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export default function BrowsePage(props: BrowseProps) {
  return (
    <Suspense fallback={<div className="text-ink-faint py-12 text-center">Đang tải...</div>}>
      <BrowseContent {...props} />
    </Suspense>
  );
}
