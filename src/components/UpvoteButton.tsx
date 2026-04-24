'use client';
import { useState } from 'react';
import { Heart } from 'lucide-react';

interface UpvoteButtonProps {
  quoteId: string;
  initialCount: number;
}

export default function UpvoteButton({ quoteId, initialCount }: UpvoteButtonProps) {
  const [count, setCount] = useState(initialCount);
  const [voted, setVoted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleVote() {
    if (voted || loading) return;
    setLoading(true);
    try {
      const res = await fetch('/api/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quote_id: quoteId }),
      });
      const data = await res.json();
      if (res.ok && typeof data.vote_count === 'number') {
        setCount(data.vote_count);
        setVoted(true);
      }
    } catch {
      // Network error — silently fail
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleVote}
      disabled={voted || loading}
      aria-label={voted ? 'Đã thích' : 'Thích trích dẫn này'}
      className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-200 min-h-[44px] ${
        loading ? 'opacity-60 cursor-wait' : ''
      } ${
        voted
          ? 'bg-sienna-light text-gold border border-gold cursor-default'
          : 'bg-sienna text-cream hover:bg-gold'
      }`}
    >
      <Heart size={16} className={voted ? 'fill-gold text-gold' : ''} />
      {count} {voted ? 'Đã thích' : 'Thích'}
    </button>
  );
}
