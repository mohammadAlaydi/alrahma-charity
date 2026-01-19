import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const isAuth = !!token;
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
      // Redirect to login page? No, we want them to go to home/login modal too probably
      // But standard protected route behavior usually redirects to /login.
      // If we redirect to /login, it will hit the block above and go to home?auth=login.
      // So this is safe.
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Role check for Admin pages
    if (isAdminPage) {
      const userRole = (token?.user as any)?.role || token?.role;
      if (userRole !== "ADMIN" && userRole !== "admin") {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/profile/:path*", "/settings/:path*", "/login", "/signup", "/reset-password"],
};
