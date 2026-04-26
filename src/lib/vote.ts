import { unstable_cache } from 'next/cache';
import { supabase } from '@/lib/supabase';

async function _getVoteCounts(quoteIds: string[]): Promise<Record<string, number>> {
  if (quoteIds.length === 0) return {};
  const { data } = await supabase
    .from('quote_stats')
    .select('quote_id, vote_count')
    .in('quote_id', quoteIds);
  const counts: Record<string, number> = {};
  (data ?? []).forEach(row => { counts[row.quote_id] = row.vote_count; });
  return counts;
}

export const getVoteCounts = unstable_cache(
  _getVoteCounts,
  ['getVoteCounts'],
  { revalidate: 60 }
);
