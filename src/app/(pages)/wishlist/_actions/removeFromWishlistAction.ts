"use server";
import { getUserToken } from "@/types/getUserToken/getUserToken";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://ecommerce.routemisr.com/api/v1";

export async function removeFromWishlistServer(productId: string) {
  try {
    const token = await getUserToken();
    console.log("[removeFromWishlistServer] token:", token);

    if (!token) return { status: "error", message: "No valid token found" };

    const res = await fetch(`${API_URL}/wishlist/${productId}`, {
      method: "DELETE",
      headers: { token },
    });

    const data = await res.json();
    console.log("[removeFromWishlistServer] response:", data);
    return data;
  } catch (err: any) {
    console.error("[removeFromWishlistServer] error:", err);
    return { status: "error", message: err.message || String(err) };
  }
}
