// lib/auth.ts
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getUserToken() {
  const cookie = (await cookies()).get("next-auth.session-token")?.value;
  if (!cookie) return null;
  
  const decoded = await decode({ token: cookie, secret: process.env.NEXTAUTH_SECRET! });
  return decoded?.token || null;
}
