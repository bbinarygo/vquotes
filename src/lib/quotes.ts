import { supabase } from '@/lib/supabase';
import { Quote } from '@/types/quote';
import { cacheLife } from 'next/cache';

export interface QuoteQueryOptions {
  category?: string;
  q?: string;
  sort?: 'newest' | 'oldest' | 'most-voted';
  page?: number;
  pageSize?: number;
}

export async function getAllQuotes(
  opts: QuoteQueryOptions = {}
): Promise<{ quotes: Quote[]; total: number }> {
  'use cache';
  cacheLife('minutes');

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

export async function getQuoteById(id: string): Promise<Quote | undefined> {
  const { data, error } = await supabase
    .from('quotes')
    .select('*')
    .eq('id', id)
    .single();

  if (error) return undefined;
  return data as Quote;
}
