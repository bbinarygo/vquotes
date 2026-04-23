import { Suspense } from 'react';
import { getAllQuotes } from '@/lib/quotes';
import { getVoteCounts } from '@/lib/vote';
import QuoteCard from '@/components/QuoteCard';
import FilterBar from '@/components/FilterBar';
import { QuoteCategory } from '@/types/quote';

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

  // Sort the full filtered set before paginating
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

  // For most-voted, counts are already fetched; for newest, fetch just the page
  const voteCounts = sort === 'most-voted'
    ? Object.fromEntries(paginated.map(q => [q.id, allVoteCounts[q.id] ?? 0]))
    : await getVoteCounts(paginated.map(quote => quote.id));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Khám phá trích dẫn</h1>
        <span className="text-sm text-gray-400">{total} trích dẫn</span>
      </div>
      <Suspense>
        <FilterBar />
      </Suspense>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {paginated.map(quote => (
          <QuoteCard key={quote.id} quote={quote} voteCount={voteCounts[quote.id] ?? 0} />
        ))}
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 pt-4">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <a
              key={p}
              href={`/browse?${new URLSearchParams({ ...(category ? { category } : {}), ...(q ? { q } : {}), sort, page: String(p) })}`}
              className={`px-3 py-1 rounded border text-sm ${p === currentPage ? 'bg-amber-500 text-white border-amber-500' : 'text-gray-600 hover:border-amber-400'}`}
            >
              {p}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default function BrowsePage(props: BrowseProps) {
  return (
    <Suspense fallback={<div className="text-gray-400 py-12 text-center">Đang tải...</div>}>
      <BrowseContent {...props} />
    </Suspense>
  );
}
