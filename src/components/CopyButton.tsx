'use client';
export default function CopyButton({ url }: { url: string }) {
  return (
    <button
      onClick={() => navigator.clipboard.writeText(url)}
      className="px-4 py-2 border rounded-lg text-sm text-gray-600 hover:border-gray-400 transition-colors"
    >
      Sao chép liên kết / Copy link
    </button>
  );
}
