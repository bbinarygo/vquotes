import Link from 'next/link';
import { CATEGORY_LIST } from '@/constants/categories';

export default function CategoryGrid() {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
      {CATEGORY_LIST.map(cat => (
        <Link
          key={cat.value}
          href={`/browse?category=${cat.value}`}
          className="flex flex-col items-center gap-1 p-3 border rounded-lg hover:border-amber-400 hover:bg-amber-50 transition-colors text-center"
        >
          <span className="text-2xl">{cat.emoji}</span>
          <span className="text-xs font-medium text-gray-700">{cat.labelVi}</span>
          <span className="text-xs text-gray-400">{cat.label}</span>
        </Link>
      ))}
    </div>
  );
}
