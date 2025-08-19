
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

interface UserJwtPayload {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Operator' | 'Viewer';
  iat: number;
  exp: number;
}

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'default-secret');

export async function middleware(req: NextRequest) {
  const tokenCookie = req.cookies.get('amberops_jwt');

  // --- CONSOLE LOG FOR DEBUGGING ---
  console.log(`[Admin Middleware] Request to: ${req.nextUrl.pathname}`);
  if (tokenCookie) {
    console.log('[Admin Middleware] Token found in cookie:', tokenCookie.value);
    try {
        const { payload } = await jwtVerify<UserJwtPayload>(tokenCookie.value, JWT_SECRET);
        console.log('[Admin Middleware] Token verified. Role:', payload.role);
    } catch (err) {
        console.error('[Admin Middleware] Token verification failed:', err);
    }
  } else {
    console.log('[Admin Middleware] No token found in cookie.');
  }
  // --- END CONSOLE LOG ---

  // The actual redirection is now handled by the client-side guard in the layout
  // to prevent race conditions after login.
  return NextResponse.next();
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};
