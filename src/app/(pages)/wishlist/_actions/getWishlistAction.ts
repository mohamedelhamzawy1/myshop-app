"use server";
import { getUserToken } from "@/types/getUserToken/getUserToken";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://ecommerce.routemisr.com/api/v1";

export async function getWishlistServer() {
  try {
    const token = await getUserToken();
    console.log("[getWishlistServer] token:", token);

    if (!token) return { status: "error", message: "No valid token found" };

    const res = await fetch(`${API_URL}/wishlist`, {
      headers: { token },
      cache: "no-store",
    });

    const data = await res.json();
    console.log("[getWishlistServer] response:", data);
    return data;
  } catch (err: any) {
    console.error("[getWishlistServer] error:", err);
    return { status: "error", message: err.message || String(err) };
  }
}
