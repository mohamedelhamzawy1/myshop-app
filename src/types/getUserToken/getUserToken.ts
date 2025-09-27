"use server";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getUserToken() {
  const sessionToken = (await cookies()).get("next-auth.session-token")?.value;

  if (!sessionToken) {
    console.error("[getUserToken] No session token found in cookies");
    return null;
  }

  const decoded: any = await decode({
    token: sessionToken,
    secret: process.env.NEXTAUTH_SECRET!,
  });

  if (!decoded?.token) {
    console.error("[getUserToken] Decoded but no .token field:", decoded);
    return null;
  }

  return decoded.token; // ✅ this is what API needs
}
