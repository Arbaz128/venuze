import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_ROUTES = ["/", "/login"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("venuze-auth-token")?.value;
  const isAuthenticated = !!token;

  if (isAuthenticated && pathname === "/login") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!isAuthenticated && !PUBLIC_ROUTES.includes(pathname)) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images/).*)"],
};
