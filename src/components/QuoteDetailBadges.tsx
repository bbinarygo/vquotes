'use client';
import { CATEGORY_LIST } from '@/constants/categories';
import { tagLabel } from '@/constants/tags';
import { useLanguage } from '@/context/LanguageContext';
import type { QuoteCategory } from '@/types/quote';

interface QuoteDetailBadgesProps {
  categories: QuoteCategory[];
  tags: string[];
}

export default function QuoteDetailBadges({ categories, tags }: QuoteDetailBadgesProps) {
  const { lang } = useLanguage();

  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {categories.map(c => {
        const cat = CATEGORY_LIST.find(x => x.value === c);
        const label = cat ? (lang === 'vi' ? cat.labelVi : cat.label) : c;
        return (
          <span key={c} className="text-xs bg-sienna-light text-sienna rounded-full px-3 py-0.5">
            {label}
          </span>
        );
      })}
      {tags.map(tag => (
        <span key={tag} className="text-xs bg-parchment text-ink-muted rounded-full px-3 py-0.5">
          #{tagLabel(tag, lang)}
        </span>
      ))}
    </div>
  );
}
