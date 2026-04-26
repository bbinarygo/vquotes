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

export async function getQuoteById(id: string): Promise<Quote | undefined> {
  const { data, error } = await supabase
    .from('quotes')
    .select('*')
    .eq('id', id)
    .single();

  if (error) return undefined;
  return data as Quote;
}
