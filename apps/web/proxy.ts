import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth-actions";

/**
 * Next.js 16 Middleware
 * Session check: blocks signed-in users from auth pages and unauthenticated users from panel.
 * Integrates with Better Auth.
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip session check for marketing/public pages (for static render)
  const publicPaths = ["/legal", "/changelog", "/contact"];

  const isPublicPath = publicPaths.some((path) => pathname.startsWith(path));

  if (isPublicPath) {
    return NextResponse.next();
  }

  // Session check
  let session = null;
  try {
    session = await getSession();
  } catch (error) {
    // On session failure, redirect panel paths to login
    if (pathname.startsWith("/panel")) {
      const callbackUrl = encodeURIComponent(pathname);
      return NextResponse.redirect(
        new URL(`/login?callbackUrl=${callbackUrl}`, request.url)
      );
    }
    return NextResponse.next();
  }

  // resend-verification: unverified users can access
  if (pathname.startsWith("/resend-verification")) {
    if (session?.user && session.user.emailVerified) {
      return NextResponse.redirect(new URL("/panel", request.url));
    }
    return NextResponse.next();
  }

  // Auth pages: redirect signed-in users to panel
  if (
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/forgot-password") ||
    pathname.startsWith("/reset-password") ||
    pathname.startsWith("/verify-email")
  ) {
    if (session?.user) {
      return NextResponse.redirect(new URL("/panel", request.url));
    }
    return NextResponse.next();
  }

  // Panel: redirect unauthenticated users to login
  if (pathname.startsWith("/panel")) {
    if (!session?.user) {
      const callbackUrl = encodeURIComponent(pathname);
      return NextResponse.redirect(
        new URL(`/login?callbackUrl=${callbackUrl}`, request.url)
      );
    }

    if (!session.user.emailVerified) {
      return NextResponse.redirect(
        new URL("/resend-verification", request.url)
      );
    }

    // RBAC: role check for admin-only paths
    const userRole = session.user.role || "USER";
    const adminOnlyPaths = ["/panel/users", "/panel/security", "/panel/rbac"];

    for (const adminPath of adminOnlyPaths) {
      if (pathname.startsWith(adminPath)) {
        if (userRole !== "ADMIN" && userRole !== "SUPER_ADMIN") {
          return NextResponse.redirect(
            new URL("/panel?error=unauthorized", request.url)
          );
        }
      }
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

/**
 * Matcher: which routes are handled by this middleware
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
