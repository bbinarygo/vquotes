'use client';
import { useState } from 'react';

export default function CopyButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard not available — silently fail
    }
  }

  return (
    <button
      onClick={handleCopy}
      aria-label="Sao chép liên kết"
      className="px-4 py-2 border rounded-lg text-sm text-gray-600 hover:border-gray-400 transition-colors"
    >
      {copied ? '✓ Đã sao chép' : 'Sao chép liên kết / Copy link'}
    </button>
  );
}
