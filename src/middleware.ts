import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSession } from "@/lib/iron-session/get-session";
import { prefix } from "@/shared/utils/constants";
import { checkSession } from "@/features/session/services/verify-session.service";

const routeRoles: { [key: string]: string[] } = {
  "/dashboard": ["ADMIN", "ADVISOR"],
  "/asesores": ["ADMIN"],
};

const publicPaths = ["/", "/ini-ses-adm"];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  if (publicPaths.includes(path)) {
    return NextResponse.next();
  }

  const session = await getSession();

  if (!session.isLoggedIn && !publicPaths.includes(path)) {
    return NextResponse.redirect(new URL("/ini-ses-adm", request.url));
  }

  if (session.isLoggedIn && session.user.role) {
    const userRole = session.user.role as string;
    const allowedRoles = routeRoles[path];

    if (allowedRoles && !allowedRoles.includes(userRole)) {
      return NextResponse.redirect(new URL(`${prefix}/dashboard`, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
