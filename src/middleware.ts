import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import createIntlMiddleware from 'next-intl/middleware';

const locales = ['en', 'es'];
const defaultLocale = 'en';

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always'
});

export async function middleware(request: NextRequest) {
  console.log('Middleware request:', request.cookies.get('next-auth.session-token'));
  
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  console.log('Middleware token:', token);
  console.log('NEXTAUTH_SECRET:', process.env.NEXTAUTH_SECRET);
  

  const response = intlMiddleware(request);

  const [, lang] = request.nextUrl.pathname.split('/');
  const pathnameWithoutLocale = request.nextUrl.pathname.replace(`/${lang}`, '') || '/';

  const publicPaths = ['/', '/auth/signin', '/auth/signup'];
  
  if (publicPaths.includes(pathnameWithoutLocale)) {
    return response;
  }

  if (!token && !publicPaths.includes(pathnameWithoutLocale)) {
    return NextResponse.redirect(new URL(`/${lang}/auth/signin`, request.url));
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)'
  ],
};