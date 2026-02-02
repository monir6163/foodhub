import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { ROLES } from "./constants/Roles";
import { publicRoutes } from "./routes/PublicRoutes";
import { userService } from "./services/user.service";

const roleDashboardMap: Record<string, string> = {
  [ROLES.ADMIN]: "/admin-dashboard",
  [ROLES.CUSTOMER]: "/dashboard",
  [ROLES.PROVIDER]: "/provider-dashboard",
};
export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const { data } = await userService.getSession();
  const user = data?.user;
  const isAuthenticated = !!user;

  if (!isAuthenticated && publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const userRole = user?.role;
  const allowedDashboard = roleDashboardMap[userRole];

  if (publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL(allowedDashboard, request.url));
  }

  if (pathname.startsWith("/admin-dashboard") && userRole !== ROLES.ADMIN) {
    return NextResponse.redirect(new URL(allowedDashboard, request.url));
  }

  if (pathname.startsWith("/dashboard") && userRole !== ROLES.CUSTOMER) {
    return NextResponse.redirect(new URL(allowedDashboard, request.url));
  }

  if (
    pathname.startsWith("/provider-dashboard") &&
    userRole !== ROLES.PROVIDER
  ) {
    return NextResponse.redirect(new URL(allowedDashboard, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin-dashboard/:path*",
    "/provider-dashboard/:path*",
    "/login",
    "/register",
    "/forgot-password",
    "/become-provider",
  ],
};
