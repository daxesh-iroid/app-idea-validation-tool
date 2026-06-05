import { NextResponse } from 'next/server';

const protectedRoutes = ['/dashboard', '/leads', '/settings', '/reports'];
const authRoutes = ['/login'];

export function middleware(request) {
  const token = request.cookies.get('token')?.value;
  const path = request.nextUrl.pathname;
  const isProtected = protectedRoutes.some((r) => path.startsWith(r));
  const isAuthRoute = authRoutes.some((r) => path.startsWith(r));

  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|public|api).*)'],
};
