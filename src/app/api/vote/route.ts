import { NextRequest, NextResponse } from 'next/server';
import { createHash } from 'crypto';
import { createServerClient } from '@/lib/supabase';

const RATE_LIMIT_PER_HOUR = 10;

export async function POST(request: NextRequest) {
  const { quote_id } = await request.json();
  if (!quote_id || typeof quote_id !== 'string') {
    return NextResponse.json({ error: 'Invalid quote_id' }, { status: 400 });
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown';
  const ip_hash = createHash('sha256').update(ip + quote_id).digest('hex');

  const db = createServerClient();

  // Rate limit: max RATE_LIMIT_PER_HOUR votes per IP per hour
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const ipPrefix = createHash('sha256').update(ip).digest('hex');
  const { count } = await db
    .from('votes')
    .select('*', { count: 'exact', head: true })
    .like('ip_hash', ipPrefix.slice(0, 16) + '%')
    .gte('created_at', oneHourAgo);

  if ((count ?? 0) >= RATE_LIMIT_PER_HOUR) {
    return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
  }

  // Insert vote (unique constraint prevents duplicates)
  const { error } = await db.from('votes').insert({ quote_id, ip_hash });
  if (error) {
    if (error.code === '23505') {
      // Already voted — return current count without error
      const { data } = await db
        .from('quote_stats')
        .select('vote_count')
        .eq('quote_id', quote_id)
        .single();
      return NextResponse.json({ vote_count: data?.vote_count ?? 0, already_voted: true });
    }
    return NextResponse.json({ error: 'Failed to record vote' }, { status: 500 });
  }

  // Increment denormalized count
  await db.rpc('increment_vote_count', { p_quote_id: quote_id });

  const { data } = await db
    .from('quote_stats')
    .select('vote_count')
    .eq('quote_id', quote_id)
    .single();

  return NextResponse.json({ vote_count: data?.vote_count ?? 1 });
}
