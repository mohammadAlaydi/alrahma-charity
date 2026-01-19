import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Define protected routes and their required roles
const protectedRoutes = {
  '/dashboard': ['user', 'admin'],
  '/dashboard/settings': ['user', 'admin'],
  '/dashboard/donations': ['user', 'admin'],
  '/dashboard/sponsorships': ['user', 'admin'],
  '/dashboard/payment-methods': ['user', 'admin'],
  '/dashboard/support': ['user', 'admin'],
  '/profile': ['user', 'admin'],
};

const adminRoutes = {
  '/admin': ['admin'],
  '/admin/users': ['admin'],
  '/admin/donations': ['admin'],
  '/admin/campaigns': ['admin'],
  '/admin/projects': ['admin'],
  '/admin/orphans': ['admin'],
  '/admin/sponsorships': ['admin'],
  '/admin/blog': ['admin'],
  '/admin/blog/add': ['admin'],
  '/admin/blog/edit': ['admin'],
  '/admin/blog/new': ['admin'],
  '/admin/blog/view': ['admin'],
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the current route is protected
  const isProtectedRoute = Object.keys(protectedRoutes).some(route => 
    pathname.startsWith(route)
  );
  
  const isAdminRoute = Object.keys(adminRoutes).some(route => 
    pathname.startsWith(route)
  );
  
  // For both protected and admin routes, we need authentication
  if (isProtectedRoute || isAdminRoute) {
    try {
      console.log('Middleware: Checking authentication for:', pathname);
      
      // Debug: Check cookies
      const cookies = request.cookies.getAll();
      const cookieNames = cookies.map(c => c.name);
      console.log('Middleware: Cookies found:', cookieNames);
      
      // Get the secret - must match NextAuth config
      const secret = process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET;
      if (!secret) {
        console.error('Middleware: NEXTAUTH_SECRET is not set!');
      }
      
      // Try to get token - getToken will automatically find the right cookie
      let token = null;
      try {
        // Use the same secret as NextAuth
        const authSecret = process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET;
        
        if (!authSecret) {
          console.error('Middleware: NEXTAUTH_SECRET is not set in environment variables!');
        }
        
        token = await getToken({ 
          req: request,
          secret: authSecret || 'fallback-secret',
        });
        
        // Debug: If token is null, check if we have the right cookie
        if (!token) {
          const sessionCookies = cookies.filter(c => 
            c.name.includes('session') || 
            c.name.includes('next-auth') ||
            c.name.includes('authjs')
          );
          console.log('Middleware: No token found. Session cookies:', sessionCookies.map(c => c.name));
        }
      } catch (error) {
        console.error('Middleware: Error getting token:', error);
      }

      console.log('Middleware: Token check result:', { 
        hasToken: !!token, 
        tokenRole: token ? (token as any).role : null,
        tokenIsAdmin: token ? (token as any).isAdmin : null,
        tokenId: token ? (token as any).id : null,
        cookiesCount: cookies.length,
        allCookieNames: cookieNames,
        hasSecret: !!secret
      });

      if (!token) {
        // Check if there's a session cookie but getToken failed (timing issue after login)
        const hasSessionCookie = cookies.some(c => {
          const name = c.name.toLowerCase();
          return name.includes('session-token') || 
                 name.includes('next-auth') ||
                 name.includes('authjs') ||
                 name.includes('session');
        });
        
        // Check referer to see if coming from auth flow
        const referer = request.headers.get('referer') || '';
        const isFromAuthFlow = referer.includes('/api/auth/') || 
                               referer.includes('callback') ||
                               request.url.includes('callbackUrl');
        
        if (hasSessionCookie || isFromAuthFlow) {
          console.log('Middleware: Session cookie exists or from auth flow, allowing through');
          console.log('Middleware: Has session cookie:', hasSessionCookie, 'Is from auth flow:', isFromAuthFlow);
          // Allow through - the page component will handle auth check with useSession
          // This handles the case where cookie is set but getToken hasn't read it yet
          return NextResponse.next();
        }
        
        // Not authenticated, redirect to home page with auth=login param and callbackUrl
        // Save the original URL the user was trying to access
        console.log('Middleware: No token and no session cookie, redirecting to login with callbackUrl:', pathname);
        const url = new URL('/', request.url);
        url.searchParams.set('auth', 'login');
        url.searchParams.set('callbackUrl', pathname);
        return NextResponse.redirect(url);
      }

      // For admin routes, check admin role
      if (isAdminRoute) {
        const tokenRole = (token as any).role;
        const tokenIsAdmin = (token as any).isAdmin;
        
        // Check if user is admin - support multiple role formats
        const isAdmin = tokenRole === 'admin' || 
                       tokenRole === 'ADMIN' || 
                       tokenIsAdmin === true || 
                       tokenIsAdmin === 'true';

        if (!isAdmin) {
          // Not an admin, redirect to dashboard
          console.log('Middleware: User is not admin. Role:', tokenRole, 'isAdmin:', tokenIsAdmin);
          return NextResponse.redirect(new URL('/dashboard', request.url));
        }
        
        console.log('Middleware: User is admin, allowing access to:', pathname);
      }

      // Add user info to headers for backend API calls
      const response = NextResponse.next();
      response.headers.set('X-User-Id', (token as any).id || '');
      response.headers.set('X-User-Email', (token as any).email || '');
      response.headers.set('X-User-Role', (token as any).role || '');
      response.headers.set('X-User-IsAdmin', String((token as any).isAdmin || false));
      
      return response;

    } catch (error) {
      console.error('Middleware error:', error);
      // On error, redirect to home page with auth=login param and callbackUrl
      const url = new URL('/', request.url);
      url.searchParams.set('auth', 'login');
      url.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};