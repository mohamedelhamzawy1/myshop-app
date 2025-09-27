"use server";
import { getUserToken } from "@/types/getUserToken/getUserToken";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://ecommerce.routemisr.com/api/v1";

export async function removeFromCartServer(productId: string) {
  try {
    const token = await getUserToken();
    console.log("[removeFromCartServer] token:", token);

    if (!token) return { status: "error", message: "No valid token found" };

    const res = await fetch(`${API_URL}/cart/${productId}`, {
      method: "DELETE",
      headers: { token },
    });

    const data = await res.json();
    console.log("[removeFromCartServer] response:", data);
    return data;
  } catch (err: any) {
    console.error("[removeFromCartServer] error:", err);
    return { status: "error", message: err.message || String(err) };
  }
}
