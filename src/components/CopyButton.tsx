'use client';
import { useState } from 'react';
import { Link2, Check } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { t } from '@/lib/i18n';

export default function CopyButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);
  const { lang } = useLanguage();

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard not available
    }
  }

  return (
    <button
      onClick={handleCopy}
      aria-label={t('aria_copy', lang)}
      className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-rule text-sm text-ink-muted hover:border-sienna hover:text-sienna transition-colors min-h-[44px]"
    >
      {copied ? <Check size={15} className="text-sienna" /> : <Link2 size={15} />}
      {copied ? t('btn_copied', lang) : t('btn_copy', lang)}
    </button>
  );
}
