import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ 
    req, 
    secret: process.env.NEXTAUTH_SECRET,
    cookieName: process.env.NODE_ENV === "production" 
      ? "__Secure-next-auth.session-token" 
      : "next-auth.session-token"
  });
  
  // Check for NextAuth session cookie as fallback indicator
  // NextAuth uses different cookie names in dev vs production
  const cookieNames = [
    "next-auth.session-token",
    "__Secure-next-auth.session-token", 
    "authjs.session-token",
    "__Secure-authjs.session-token"
  ];
  
  const hasSessionCookie = cookieNames.some(name => req.cookies.has(name));
  
  // Check for token existence and that it has required fields
  const hasToken = !!token && (!!token.email || !!token.id);
  
  // User is authenticated if they have either a valid token or a session cookie
  const isAuth = hasToken || hasSessionCookie;
  
  const isAuthPage = req.nextUrl.pathname.startsWith("/login") || req.nextUrl.pathname.startsWith("/signup");
  const isAdminPage = req.nextUrl.pathname.startsWith("/admin");
  const isDashboardPage = req.nextUrl.pathname.startsWith("/dashboard");

  // Handle Auth Pages (Login/Signup/ResetPassword)
  if (isAuthPage || req.nextUrl.pathname.startsWith("/reset-password")) {
    if (isAuth) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    // Redirect unauthenticated users to home with query param to open modal
    const url = new URL("/", req.url);
    if (req.nextUrl.pathname.startsWith("/login")) {
      url.searchParams.set("auth", "login");
    } else if (req.nextUrl.pathname.startsWith("/signup")) {
      url.searchParams.set("auth", "signup");
    } else if (req.nextUrl.pathname.startsWith("/reset-password")) {
      url.searchParams.set("auth", "forgot-password");
    }
    return NextResponse.redirect(url);
  }

  // Protect Admin and Dashboard Routes
  if (isAdminPage || isDashboardPage) {
    if (!isAuth) {
      // Redirect to login page which will then redirect to home with auth=login
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Role check for Admin pages
    if (isAdminPage && token) {
      const userRole = token?.role;
      const isAdmin = token?.isAdmin;
      if (userRole !== "admin" && userRole !== "ADMIN" && !isAdmin) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    }
  }

  // If authenticated user is on home page with auth=login param, remove it
  const isHomePage = req.nextUrl.pathname === "/";
  if (isHomePage && isAuth && req.nextUrl.searchParams.get("auth") === "login") {
    const url = new URL("/", req.url);
    url.searchParams.delete("auth");
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/profile/:path*", "/settings/:path*", "/login", "/signup", "/reset-password"],
};
