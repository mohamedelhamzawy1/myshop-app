"use server";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

function maskToken(t?: string | null) {
  if (!t) return null;
  if (t.length <= 12) return t;
  return `${t.slice(0, 6)}...${t.slice(-6)}`;
}

export async function getUserToken() {
  try {
    const cookieValue = (await cookies()).get("next-auth.session-token")?.value;
    console.log("[getUserToken] session-cookie (masked):", maskToken(cookieValue));

    const accessToken = await decode({ token: cookieValue, secret: process.env.NEXTAUTH_SECRET! });

    // Mask the token field if present (avoid printing full JWT)
    const decodedMasked = accessToken
      ? { ...accessToken, token: maskToken((accessToken as any).token) }
      : null;

    console.log("[getUserToken] decoded payload (masked):", decodedMasked);

    return accessToken?.token ?? null;
  } catch (err) {
    console.error("[getUserToken] decode error:", err);
    return null;
  }
}
