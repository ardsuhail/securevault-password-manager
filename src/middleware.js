import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = req.nextUrl;

  // ✅ Allow requests for NextAuth & static files
  if (pathname.startsWith("/api/auth") || pathname === "/_next" || pathname.includes(".")) {
    return NextResponse.next();
  }

  // ✅ If not logged in, redirect to home page
  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // ✅ If logged in, continue normally
  return NextResponse.next();
}

// Protect user routes
export const config = {
  matcher: ["/user/:path*"],
};
