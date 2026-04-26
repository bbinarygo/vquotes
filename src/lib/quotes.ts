import { unstable_cache } from 'next/cache';
import { supabase } from '@/lib/supabase';
import { Quote } from '@/types/quote';

export interface QuoteQueryOptions {
  category?: string;
  q?: string;
  sort?: 'newest' | 'oldest' | 'most-voted';
  page?: number;
  pageSize?: number;
}

async function _getAllQuotes(
  opts: QuoteQueryOptions = {}
): Promise<{ quotes: Quote[]; total: number }> {
  const { category, q, sort = 'newest', page = 1, pageSize = 20 } = opts;
  const offset = (page - 1) * pageSize;

  let query = supabase
    .from('quotes')
    .select('*', { count: 'exact' });

  if (category) {
    query = query.contains('category', [category]);
  }

  if (q) {
    const term = q.trim().slice(0, 200);
    query = query.or(
      `quote_vi.ilike.%${term}%,quote_en.ilike.%${term}%,author.ilike.%${term}%`
    );
  }

  if (sort === 'newest') {
    query = query.order('year', { ascending: false, nullsFirst: false });
  } else if (sort === 'oldest') {
    query = query.order('year', { ascending: true, nullsFirst: false });
  }
  // 'most-voted' sort is handled in the browse page after fetching vote counts

  if (sort !== 'most-voted') {
    query = query.range(offset, offset + pageSize - 1);
  }

  const { data, count, error } = await query;

  if (error) throw new Error(`getAllQuotes: ${error.message}`);

  return {
    quotes: (data ?? []) as Quote[],
    total: count ?? 0,
  };
}

export const getAllQuotes = unstable_cache(
  _getAllQuotes,
  ['getAllQuotes'],
  { revalidate: 60 }
);

async function _getQuoteById(id: number): Promise<Quote | undefined> {
  const { data, error } = await supabase
    .from('quotes')
    .select('*')
    .eq('id', id)
    .single();

  if (error) return undefined;
  return data as Quote;
}

export const getQuoteById = unstable_cache(
  async (id: number) => _getQuoteById(id),
  ['getQuoteById'],
  { revalidate: 3600 }
);

export const getDailyQuote = unstable_cache(
  async (): Promise<Quote | undefined> => {
    // 1. Get current date seed (YYYYMMDD) in UTC
    const now = new Date();
    const seedStr = `${now.getUTCFullYear()}${(now.getUTCMonth() + 1).toString().padStart(2, '0')}${now.getUTCDate().toString().padStart(2, '0')}`;
    const seed = parseInt(seedStr, 10);

    // 2. Try to get featured quotes first (ordered by id)
    const { data: featuredData } = await supabase
      .from('quotes')
      .select('id')
      .eq('featured', true)
      .order('id');

    if (featuredData && featuredData.length > 0) {
      const targetId = featuredData[seed % featuredData.length].id;
      return getQuoteById(targetId);
    }

    // 3. Fallback: pick from all quotes (ordered by id)
    const { count } = await supabase
      .from('quotes')
      .select('*', { count: 'exact', head: true });

    if (!count) return undefined;

    const targetOffset = seed % count;
    const { data: fallbackData } = await supabase
      .from('quotes')
      .select('*')
      .order('id')
      .range(targetOffset, targetOffset)
      .single();

    return fallbackData as Quote;
  },
  ['getDailyQuote'],
  { revalidate: 86400 }
);
