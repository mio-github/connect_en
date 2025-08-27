// Next.js Middleware - テナント認証とルーティング
// Next.js Middleware - Tenant authentication and routing

import { NextRequest } from 'next/server';
import { tenantMiddleware } from '@/middleware/tenant';

export async function middleware(request: NextRequest) {
  return await tenantMiddleware(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};