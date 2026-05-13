import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const authHeader = request.headers.get("authorization") ?? "";
    const [scheme, encoded] = authHeader.split(" ");

    if (scheme !== "Basic" || !encoded) {
      return new NextResponse("Acceso denegado", {
        status: 401,
        headers: { "WWW-Authenticate": 'Basic realm="Admin DeFi Venezuela"' },
      });
    }

    const decoded = Buffer.from(encoded, "base64").toString("utf-8");
    const [user, pass] = decoded.split(":");

    const validUser = process.env.ADMIN_USER;
    const validPass = process.env.ADMIN_PASSWORD;

    if (user !== validUser || pass !== validPass) {
      return new NextResponse("Credenciales incorrectas", {
        status: 401,
        headers: { "WWW-Authenticate": 'Basic realm="Admin DeFi Venezuela"' },
      });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
