import { NextResponse } from 'next/server';
import { verifyToken } from './lib/auth';

// Korumalı rotalar
const protectedRoutes = ['/dashboard', '/dashboard/feedback', '/dashboard/settings'];
// Sadece giriş yapmamış kullanıcıların erişebileceği rotalar
const authRoutes = ['/sign-in', '/sign-up'];

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token')?.value;
  
  // Token varsa ve geçerliyse kullanıcı giriş yapmış demektir
  const isAuthenticated = token && verifyToken(token);
  
  // Korumalı bir rotaya erişmeye çalışıyorsa ve giriş yapmamışsa
  if (protectedRoutes.some(route => pathname.startsWith(route)) && !isAuthenticated) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }
  
  // Giriş yapmış kullanıcı auth rotalarına erişmeye çalışıyorsa
  if (authRoutes.includes(pathname) && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [...protectedRoutes, ...authRoutes],
}; 