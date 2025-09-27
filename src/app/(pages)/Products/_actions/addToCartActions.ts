"use server";
import { getUserToken } from "@/types/getUserToken/getUserToken";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://ecommerce.routemisr.com/api/v1";
function maskToken(t?: string | null) { if (!t) return null; if (t.length <= 12) return t; return `${t.slice(0,6)}...${t.slice(-6)}`; }

export async function addToCartServer(productId: string) {
  try {
    const token = await getUserToken();
    console.log("[addToCartServer] token (masked):", maskToken(token), "productId:", productId);

    const res = await fetch(`${API_URL}/cart`, {
      method: "POST",
      body: JSON.stringify({ productId }),
      headers: { "Content-Type": "application/json", token: token + "" },
    });

    const text = await res.text();
    console.log("[addToCartServer] API status:", res.status, "body:", text);

    try { return JSON.parse(text); } catch { return { status: "error", message: text }; }
  } catch (err: any) {
    console.error("[addToCartServer] Error:", err);
    return { status: "error", message: err.message || String(err) };
  }
}
