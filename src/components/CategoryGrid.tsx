import Link from 'next/link';
import { QuoteCategory } from '@/types/quote';

const CATEGORIES: { value: QuoteCategory; label: string; labelVi: string; emoji: string }[] = [
  { value: 'film', label: 'Film', labelVi: 'Phim', emoji: '🎬' },
  { value: 'series', label: 'Series', labelVi: 'Phim bộ', emoji: '📺' },
  { value: 'poem', label: 'Poem', labelVi: 'Thơ', emoji: '📜' },
  { value: 'song', label: 'Song', labelVi: 'Ca khúc', emoji: '🎵' },
  { value: 'novel', label: 'Novel', labelVi: 'Tiểu thuyết', emoji: '📚' },
  { value: 'proverb', label: 'Proverb', labelVi: 'Tục ngữ', emoji: '🌾' },
  { value: 'speech', label: 'Speech', labelVi: 'Bài phát biểu', emoji: '🎤' },
  { value: 'interview', label: 'Interview', labelVi: 'Phỏng vấn', emoji: '💬' },
  { value: 'book', label: 'Book', labelVi: 'Sách', emoji: '📖' },
  { value: 'famous-person', label: 'Famous Person', labelVi: 'Người nổi tiếng', emoji: '⭐' },
  { value: 'government-official', label: 'Official', labelVi: 'Quan chức', emoji: '🏛️' },
  { value: 'military', label: 'Military', labelVi: 'Quân sự', emoji: '⚔️' },
  { value: 'religious', label: 'Religious', labelVi: 'Tôn giáo', emoji: '🕊️' },
  { value: 'athlete', label: 'Athlete', labelVi: 'Vận động viên', emoji: '🏆' },
  { value: 'entrepreneur', label: 'Entrepreneur', labelVi: 'Doanh nhân', emoji: '💼' },
];

export default function CategoryGrid() {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
      {CATEGORIES.map(cat => (
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
