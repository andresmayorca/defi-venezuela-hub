import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin/login" || pathname.startsWith("/api/admin/login")) {
    return NextResponse.next();
  }

  const expectedToken = Buffer.from(
    `${process.env.ADMIN_USER}:${process.env.ADMIN_PASSWORD}`
  ).toString("base64");

  const sessionCookie = request.cookies.get("admin_session")?.value;

  if (sessionCookie !== expectedToken) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
