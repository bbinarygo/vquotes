export type QuoteCategory =
  | 'film'
  | 'series'
  | 'poem'
  | 'song'
  | 'novel'
  | 'proverb'
  | 'speech'
  | 'interview'
  | 'book'
  | 'famous-person'
  | 'government-official'
  | 'military'
  | 'religious'
  | 'athlete'
  | 'entrepreneur'
  | 'entertainment'
  | 'history'
  | 'philosophy';

export interface Quote {
  id: number;
  quote_vi: string;
  quote_en: string;
  author: string;
  source: string;
  source_url?: string;
  category: QuoteCategory[];
  tags: string[];
  year: number | null;
  verified: boolean;
  featured: boolean;
  contributor_github: string | null;
}
