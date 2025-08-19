
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('amberops_jwt');
  const homeUrl = process.env.NEXT_PUBLIC_HOME_URL || 'http://localhost:3001';

  // --- CONSOLE LOG FOR DEBUGGING ---
  console.log(`[Web Middleware] Request to: ${req.nextUrl.pathname}`);
  if (token) {
    console.log('[Web Middleware] Token found in cookie:', token.value);
  } else {
    console.log('[Web Middleware] No token found in cookie.');
  }
  // --- END CONSOLE LOG ---

  // Redirect logic is now primarily handled client-side to avoid race conditions,
  // but middleware can provide an initial layer of protection.
  if (!token && !req.nextUrl.pathname.startsWith('/login')) {
    //return NextResponse.redirect(new URL('/login', req.url));
  }


  return NextResponse.next();
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};
