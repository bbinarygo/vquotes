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
    const res = await fetch('/api/vote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quote_id: quoteId }),
    });
    const data = await res.json();
    if (res.ok) {
      setCount(data.vote_count);
      setVoted(true);
    }
    setLoading(false);
  }

  return (
    <button
      onClick={handleVote}
      disabled={voted || loading}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg border font-medium transition-colors ${
        voted
          ? 'bg-amber-50 border-amber-300 text-amber-700 cursor-default'
          : 'bg-white border-gray-300 text-gray-700 hover:border-amber-400 hover:text-amber-600'
      }`}
    >
      ▲ {count} {voted ? 'Đã thích' : 'Thích'}
    </button>
  );
}
