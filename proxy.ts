import { NextResponse, type NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
import { auth } from "@/lib/auth";


export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAuthPage =
    pathname.startsWith("/login") || pathname.startsWith("/signup");

  const isAdminRoute = pathname.startsWith("/admin");
  const isOnboardingRoute = pathname.startsWith("/onboarding");

  const sessionCookie = getSessionCookie(request);

  // 🔹 If no session
  if (!sessionCookie) {
    if (isAdminRoute || isOnboardingRoute) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    const user = session?.user;


    // 🔹 Guard against invalid cookies on auth pages
    if (!user && !isAuthPage) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (!user) return NextResponse.next();

    // 🔹 Force onboarding first
    if (!user.isOnboarded && !isOnboardingRoute && !isAuthPage) {
      return NextResponse.redirect(new URL("/onboarding", request.url));
    }

    // 🔹 Prevent onboarded users from auth pages
    if (user.isOnboarded && isAuthPage) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // 🔹 Admin protection
    if (isAdminRoute) {
      // Robust check for ADMIN role
      const role = String(user.role).toUpperCase();
      if (role !== "ADMIN") {
        console.log("PROXY: Access denied to admin route. Role:", role);
        return NextResponse.redirect(new URL("/", request.url));
      }
    }
  } catch (err) {
    console.error("Proxy error:", err);
    if (!isAuthPage) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
