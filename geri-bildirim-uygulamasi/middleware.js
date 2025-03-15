import { NextResponse } from 'next/server';

// Note: This middleware won't work with localStorage as it runs on the server
// We'll need to handle auth checks on the client side instead
// This middleware will only handle public routes redirection

export function middleware(request) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // Define paths that are considered public (no authentication required)
  const isPublicPath = path === '/' || path === '/login' || path === '/register' || path.startsWith('/api/auth');

  // For protected API routes, check the Authorization header
  if (path.startsWith('/api/') && !path.startsWith('/api/auth')) {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

// Configure the middleware to run only on specific paths
export const config = {
  matcher: [
    '/api/:path*',
  ],
}; 