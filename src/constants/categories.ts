import { QuoteCategory } from '@/types/quote';

export const CATEGORY_LIST: { value: QuoteCategory; label: string; labelVi: string; emoji: string }[] = [
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
  { value: 'government-official', label: 'Official', labelVi: 'Chính trị gia', emoji: '🏛️' },
  { value: 'military', label: 'Military', labelVi: 'Quân sự', emoji: '⚔️' },
  { value: 'religious', label: 'Religious', labelVi: 'Tôn giáo', emoji: '🕊️' },
  { value: 'athlete', label: 'Athlete', labelVi: 'Vận động viên', emoji: '🏆' },
  { value: 'entrepreneur', label: 'Entrepreneur', labelVi: 'Doanh nhân', emoji: '💼' },
];
