"use server";
import { getUserToken } from "@/types/getUserToken/getUserToken";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://ecommerce.routemisr.com/api/v1";

export async function getCartServer() {
  try {
    const token = await getUserToken();
    console.log("[getCartServer] token:", token);

    if (!token) return { status: "error", message: "No valid token found" };

    const res = await fetch(`${API_URL}/cart`, {
      headers: { token },
      cache: "no-store",
    });

    const data = await res.json();
    console.log("[getCartServer] response:", data);
    return data;
  } catch (err: any) {
    console.error("[getCartServer] error:", err);
    return { status: "error", message: err.message || String(err) };
  }
}
