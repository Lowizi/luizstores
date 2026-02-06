import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Next.js Middleware for Route Protection
 * 
 * This runs before every request to check if the user is authenticated.
 * Protected routes redirect to login if no auth token exists.
 * 
 * Later, this will validate JWT tokens from the Django backend.
 * For now, it checks for a simple cookie/header.
 */

// Routes that require authentication
const protectedRoutes = ["/dashboard"];

// Routes that require pending verification (just signed up)
const verificationRoutes = ["/verify-email"];

// Routes only for unauthenticated users
const authRoutes = ["/login", "/signup"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check for auth token (cookie or localStorage won't work here, so we use cookies)
  // Later this will be a JWT token from Django
  const authToken = request.cookies.get("auth_token")?.value;
  const pendingVerification = request.cookies.get("pending_verification")?.value;
  
  // Check if trying to access protected route without auth
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  const isVerificationRoute = verificationRoutes.some(route => pathname.startsWith(route));
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));
  
  if (isProtectedRoute && !authToken) {
    // Redirect unauthenticated users to login
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }
  
  if (isVerificationRoute && !pendingVerification && !authToken) {
    // Only allow verify-email if user just signed up or is already logged in
    return NextResponse.redirect(new URL("/signup", request.url));
  }
  
  if (isAuthRoute && authToken) {
    // Redirect authenticated users away from login/signup to dashboard
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  
  return NextResponse.next();
}

// Configure which routes middleware runs on
export const config = {
  matcher: [
    // Match all routes except static files and API routes
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
