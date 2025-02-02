import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSession } from "@/lib/iron-session/get-session";
import { Role } from "@prisma/client";
import {
  prefix,
  publicPaths,
  authPaths,
  defaultRoutes,
} from "@/features/layout/nav-config/constants";
import {
  getRoutesByRoles,
  matchRoute,
} from "@/features/layout/nav-config/nav-links";

const routeRoles = getRoutesByRoles();

const staticResources = ["/_next/", "/api/", "/static/", "/images/"];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  if (staticResources.some((resource) => path.startsWith(resource))) {
    return NextResponse.next();
  }

  const pathWithoutQuery = path.split("?")[0];

  const session = await getSession();

  if (!session.isLoggedIn) {
    if (
      publicPaths.includes(pathWithoutQuery) ||
      authPaths.includes(pathWithoutQuery)
    ) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL(authPaths[0], request.url));
  }

  const userRole = session.user.role as Role;

  if (publicPaths.includes(pathWithoutQuery)) {
    const redirectUrl = new URL(defaultRoutes[userRole], request.url);
    return NextResponse.redirect(redirectUrl);
  }

  if (pathWithoutQuery.startsWith(prefix)) {
    const hasPermission = Object.entries(routeRoles).some(
      ([pattern, roles]) => {
        const matches = matchRoute(pattern, pathWithoutQuery);
        if (matches) {
          return roles.includes(userRole);
        }
        return false;
      }
    );

    if (!hasPermission && pathWithoutQuery !== defaultRoutes[userRole]) {
      const redirectUrl = new URL(defaultRoutes[userRole], request.url);
      return NextResponse.redirect(redirectUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Excluir explícitamente favicon.ico y otros recursos estáticos
    "/((?!favicon\\.ico|_next/static|_next/image|api|static|images).*)",
  ],
};
