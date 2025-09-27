"use server";
import { getUserToken } from "@/types/getUserToken/getUserToken";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://ecommerce.routemisr.com/api/v1";

export async function addToWishlistServer(productId: string) {
  try {
    const token = await getUserToken();
    console.log("[addToWishlistServer] token:", token);

    if (!token) return { status: "error", message: "No valid token found" };

    const res = await fetch(`${API_URL}/wishlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token,
      },
      body: JSON.stringify({ productId }),
    });

    const data = await res.json();
    console.log("[addToWishlistServer] response:", data);
    return data;
  } catch (err: any) {
    console.error("[addToWishlistServer] error:", err);
    return { status: "error", message: err.message || String(err) };
  }
}
