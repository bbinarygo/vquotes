'use client';
import { LanguageProvider } from '@/context/LanguageContext';

export default function LayoutClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      {children}
    </LanguageProvider>
  );
}
