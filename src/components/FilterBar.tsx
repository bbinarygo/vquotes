'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { QuoteCategory } from '@/types/quote';

const CATEGORIES: QuoteCategory[] = [
  'film','series','poem','song','novel','proverb',
  'speech','interview','book','famous-person',
  'government-official','military','religious','athlete','entrepreneur'
];

const SORT_OPTIONS = [
  { value: 'newest', label: 'Mới nhất / Newest' },
  { value: 'most-voted', label: 'Nhiều thích nhất / Most voted' },
];

export default function FilterBar() {
  const router = useRouter();
  const params = useSearchParams();

  function update(key: string, value: string) {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    next.delete('page');
    router.push(`/browse?${next.toString()}`);
  }

  return (
    <div className="flex flex-wrap gap-3 items-center">
      <select
        value={params.get('category') ?? ''}
        onChange={e => update('category', e.target.value)}
        className="border rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-amber-400"
      >
        <option value="">Tất cả thể loại / All categories</option>
        {CATEGORIES.map(c => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
      <select
        value={params.get('sort') ?? 'newest'}
        onChange={e => update('sort', e.target.value)}
        className="border rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-amber-400"
      >
        {SORT_OPTIONS.map(o => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      <input
        type="text"
        defaultValue={params.get('q') ?? ''}
        placeholder="Tìm kiếm... / Search..."
        onKeyDown={e => { if (e.key === 'Enter') update('q', (e.target as HTMLInputElement).value); }}
        className="border rounded-lg px-3 py-2 text-sm flex-1 min-w-40 focus:outline-none focus:border-amber-400"
      />
    </div>
  );
}
