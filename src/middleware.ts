import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const routeRoles: { [key: string]: string[] } = {
  "/dashboard": ["ADMIN", "ADVISOR"],
  "/asesores": ["ADMIN"],
};

const publicPaths = ["/", "/auth/signin", "/test-notifications"];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (publicPaths.includes(path)) {
    return NextResponse.next();
  }

  if (token && publicPaths.includes(path)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!token) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  try {
    const sessionResponse = await fetch(new URL('/api/verify-session', request.url), {
      method: 'POST',
      headers: request.headers,
    });

    if (!sessionResponse.ok) {
      return NextResponse.redirect(new URL("/auth/signin", request.url));
    }
  } catch (error) {
    console.error("Error verifying session:", error);
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  if (token.role) {
    const userRole = token.role as string;
    const allowedRoles = routeRoles[path];

    if (allowedRoles && !allowedRoles.includes(userRole)) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};