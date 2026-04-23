import { getAllQuotes } from '@/lib/quotes';
import QuoteCard from '@/components/QuoteCard';
import SearchBar from '@/components/SearchBar';
import CategoryGrid from '@/components/CategoryGrid';

export default function HomePage() {
  const allQuotes = getAllQuotes();
  const featured = [...allQuotes].sort(() => Math.random() - 0.5).slice(0, 5);

  return (
    <div className="space-y-12">
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">
          Trích dẫn Việt Nam
        </h1>
        <p className="text-gray-500 mb-8">
          Kho trích dẫn Việt Nam song ngữ — phim, thơ, tục ngữ, người nổi tiếng
        </p>
        <div className="flex justify-center">
          <SearchBar />
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Trích dẫn nổi bật</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featured.map(q => (
            <QuoteCard key={q.id} quote={q} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Khám phá theo thể loại</h2>
        <CategoryGrid />
      </section>
    </div>
  );
}
