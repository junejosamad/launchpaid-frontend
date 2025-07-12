// app/middleware/auth.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtDecode } from 'jwt-decode';

interface TokenPayload {
  sub: string;
  role: string;
  exp: number;
  email_verified: boolean;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Public routes that don't require authentication
  const publicRoutes = ['/auth/login', '/auth/signup', '/auth/forgot-password', '/auth/verify-email', '/'];
  
  // Check if current route is public
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }
  
  // Get token from cookies
  const token = request.cookies.get('access_token')?.value;
  
  // If no token, redirect to login
  if (!token) {
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }
  
  try {
    // Decode and validate token
    const decoded = jwtDecode<TokenPayload>(token);
    
    // Check if token is expired
    if (Date.now() >= decoded.exp * 1000) {
      // Try to refresh token using refresh_token cookie
      const refreshToken = request.cookies.get('refresh_token')?.value;
      
      if (refreshToken) {
        // Return response that triggers token refresh on client
        const response = NextResponse.next();
        response.headers.set('X-Token-Expired', 'true');
        return response;
      }
      
      // No refresh token, redirect to login
      const loginUrl = new URL('/auth/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
    
    // Check email verification for protected routes
    if (!decoded.email_verified && !pathname.startsWith('/auth/verify-email')) {
      return NextResponse.redirect(new URL('/auth/verify-email', request.url));
    }
    
    // Role-based route protection
    const roleRoutes = {
      creator: ['/dashboard/profile', '/dashboard/campaigns', '/dashboard/earnings'],
      agency: ['/agency/dashboard', '/agency/creators', '/agency/campaigns'],
      brand: ['/brand/dashboard', '/brand/campaigns'],
      admin: ['/admin']
    };
    
    // Check if user has access to the requested route
    const userRole = decoded.role;
    const hasAccess = Object.entries(roleRoutes).some(([role, routes]) => {
      if (userRole === role || userRole === 'admin') {
        return routes.some(route => pathname.startsWith(route));
      }
      return false;
    });
    
    // Allow access to common dashboard routes for all authenticated users
    const commonRoutes = ['/dashboard', '/profile', '/settings'];
    if (commonRoutes.some(route => pathname === route)) {
      return NextResponse.next();
    }
    
    // If user doesn't have access to specific role routes, check if they're trying to access them
    const isRestrictedRoute = Object.values(roleRoutes).flat().some(route => pathname.startsWith(route));
    
    if (isRestrictedRoute && !hasAccess) {
      // Redirect to appropriate dashboard based on role
      const dashboardUrls = {
        creator: '/dashboard',
        agency: '/agency/dashboard',
        brand: '/brand/dashboard',
        admin: '/admin/dashboard'
      };
      
      const dashboardUrl = dashboardUrls[userRole as keyof typeof dashboardUrls] || '/';
      return NextResponse.redirect(new URL(dashboardUrl, request.url));
    }
    
    // Allow the request to proceed
    const response = NextResponse.next();
    
    // Add user info to headers for use in components
    response.headers.set('X-User-Role', userRole);
    response.headers.set('X-User-Id', decoded.sub);
    
    return response;
    
  } catch (error) {
    console.error('Token validation error:', error);
    
    // Invalid token, redirect to login
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};