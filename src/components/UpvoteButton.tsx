'use client';
import { useState } from 'react';

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
      // Network error — silently fail, don't change state
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleVote}
      disabled={voted || loading}
      aria-label={voted ? 'Đã thích trích dẫn này' : 'Thích trích dẫn này'}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg border font-medium transition-colors ${
        loading ? 'opacity-60 cursor-wait' : ''
      } ${
        voted
          ? 'bg-amber-50 border-amber-300 text-amber-700 cursor-default'
          : 'bg-white border-gray-300 text-gray-700 hover:border-amber-400 hover:text-amber-600'
      }`}
    >
      ▲ {count} {voted ? 'Đã thích' : loading ? '...' : 'Thích'}
    </button>
  );
}
