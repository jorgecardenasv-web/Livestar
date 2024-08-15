import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const publicPaths = ["/", "/auth/signin", "/auth/signup"];
  const path = request.nextUrl.pathname;

  if (token && publicPaths.includes(path)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!token && !publicPaths.includes(path)) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
