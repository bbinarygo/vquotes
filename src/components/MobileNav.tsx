'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Đóng menu' : 'Mở menu'}
        className="flex items-center justify-center w-11 h-11 text-ink-muted hover:text-sienna transition-colors"
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-20"
            onClick={() => setOpen(false)}
          />
          <nav className="absolute top-16 left-0 right-0 z-30 bg-cream border-b border-rule shadow-card px-6 py-4 flex flex-col gap-4">
            <Link
              href="/browse"
              onClick={() => setOpen(false)}
              className="text-base text-ink-muted hover:text-sienna transition-colors py-2 border-b border-rule"
            >
              Khám phá / Browse
            </Link>
            <Link
              href="/contribute"
              onClick={() => setOpen(false)}
              className="text-base text-ink-muted hover:text-sienna transition-colors py-2"
            >
              Đóng góp / Contribute
            </Link>
          </nav>
        </>
      )}
    </div>
  );
}
