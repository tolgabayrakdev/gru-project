import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // localStorage'dan token'ı alamayız, çünkü middleware sunucu tarafında çalışır
  // Bu nedenle token'ı cookie'den almalıyız
  const token = request.cookies.get('token')?.value || '';
  
  const isAuthPage = request.nextUrl.pathname.startsWith('/sign-in') || 
                    request.nextUrl.pathname.startsWith('/sign-up');
  const isDashboardPage = request.nextUrl.pathname.startsWith('/dashboard');

  if (isDashboardPage && !token) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/sign-in', '/sign-up'],
}; 