import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const routeRoles: { [key: string]: string[] } = {
  "/dashboard": ["ADMIN", "ADVISOR"],
  "/asesores": ["ADMIN"],
};

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const publicPaths = ["/", "/auth/signin"];
  const path = request.nextUrl.pathname;

  if (token && publicPaths.includes(path)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!token && !publicPaths.includes(path)) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  if (token && token.role) {
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
