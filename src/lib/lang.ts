import { headers } from 'next/headers';
import { cacheLife } from 'next/cache';
import type { Lang } from '@/lib/i18n';

export async function getLang(): Promise<Lang> {
  'use cache';
  cacheLife('minutes');

  try {
    const headersList = await headers();
    const lang = headersList.get('x-next-lang');
    return lang === 'en' ? 'en' : 'vi';
  } catch {
    return 'vi';
  }
}
