import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/", "/manage-school", "/login"];

// This function can be marked `async` if using `await` inside

export function middleware(request: NextRequest) {
  if (
    request.cookies.has("login") &&
    protectedRoutes.includes(request.nextUrl.pathname)
  ) {
    return NextResponse.next();
  } else {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

export const config = {
  matcher: ["/", "/manage-school"],
};
