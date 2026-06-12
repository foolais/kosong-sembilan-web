import { NextRequest, NextResponse } from "next/server";
import { verifyAccessToken } from "./lib/jwt";

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  const token = request.cookies.get("accessToken")?.value;

  let isValidToken = false;
  if (token) {
    try {
      verifyAccessToken(token);
      isValidToken = true;
    } catch {
      isValidToken = false;
    }
  }

  if (isValidToken && pathname === "/login") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!isValidToken && pathname !== "/login") {
    if (pathname.startsWith("/api")) {
      return NextResponse.json({ message: "Tidak sah" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/:path*",
    "/dashboard/:path*",
    "/tambah-keluarga/:path*",
    "/daftar-keluarga/:path*",
    "/",
    "/login",
    "/profil",
  ],
};
