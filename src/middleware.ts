import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const protectedPages = ["/cart", "/profile"];
const authPages = ["/login", "/register"];

export default async function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl;
  console.log("Middleware hit:", pathname);

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  console.log("Token:", token);

  if (protectedPages.some((p) => pathname.startsWith(p))) {
    if (!token) {
      const loginUrl = new URL("/login", origin);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  if (authPages.some((p) => pathname.startsWith(p))) {
    if (token) {
      const homeUrl = new URL("/", origin);
      return NextResponse.redirect(homeUrl);
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/cart", "/profile", "/login", "/register"],
};
