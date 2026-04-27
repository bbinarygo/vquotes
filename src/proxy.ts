import { NextRequest, NextResponse } from 'next/server';

const VALID_LANGS = ['vi', 'en'] as const;
type Lang = (typeof VALID_LANGS)[number];

export function proxy(request: NextRequest) {
  const cookie = request.cookies.get('vquotes-lang')?.value;
  const lang: Lang = VALID_LANGS.includes(cookie as Lang) ? (cookie as Lang) : 'vi';

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-next-lang', lang);

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ['/((?!_next|favicon).*)'],
};
