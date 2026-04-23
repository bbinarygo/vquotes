import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import Link from 'next/link';
import './globals.css';

const geist = Geist({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'VQuotes — Trích dẫn Việt Nam / Vietnamese Quotes',
  description: 'Cơ sở dữ liệu mở trích dẫn Việt Nam song ngữ. Open database of Vietnamese quotes in Vietnamese and English.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className={`${geist.className} bg-gray-50 min-h-screen`}>
        <header className="bg-white border-b sticky top-0 z-10">
          <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
            <Link href="/" className="font-bold text-xl text-amber-600">VQuotes</Link>
            <nav className="flex gap-4 text-sm text-gray-600">
              <Link href="/browse" className="hover:text-amber-600">Khám phá / Browse</Link>
              <Link href="/contribute" className="hover:text-amber-600">Đóng góp / Contribute</Link>
            </nav>
          </div>
        </header>
        <div className="max-w-5xl mx-auto px-4 py-8">
          {children}
        </div>
        <footer className="border-t mt-16 py-8 text-center text-sm text-gray-400">
          <p>VQuotes — CC0 License — Dữ liệu mở cho cộng đồng</p>
          <p className="mt-1">Mọi trích dẫn đều được xác minh từ nguồn công khai. Chỉ phục vụ mục đích văn hóa và giáo dục.</p>
        </footer>
      </body>
    </html>
  );
}
