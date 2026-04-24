'use client';
import Link from 'next/link';
import { CATEGORY_LIST } from '@/constants/categories';
import { useLanguage } from '@/context/LanguageContext';

export default function CategoryGrid() {
  const { lang } = useLanguage();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
      {CATEGORY_LIST.map(cat => (
        <Link
          key={cat.value}
          href={`/browse?category=${cat.value}`}
          className="group flex flex-col justify-between bg-white border border-rule border-l-4 border-l-sienna rounded-r-lg p-4 transition-all duration-200 hover:bg-parchment hover:border-l-gold shadow-card"
        >
          <p className="font-playfair font-bold text-base text-ink leading-tight mb-1 group-hover:text-sienna transition-colors">
            {lang === 'vi' ? cat.labelVi : cat.label}
          </p>
          <p className="text-xs text-ink-faint">{lang === 'vi' ? cat.label : cat.labelVi}</p>
        </Link>
      ))}
    </div>
  );
}
