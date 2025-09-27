"use server";
import { getUserToken } from "@/types/getUserToken/getUserToken";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://ecommerce.routemisr.com/api/v1";

export async function clearCartServer() {
  try {
    const token = await getUserToken();
    console.log("[clearCartServer] token:", token);

    if (!token) return { status: "error", message: "No valid token found" };

    const res = await fetch(`${API_URL}/cart`, {
      method: "DELETE",
      headers: { token },
    });

    const data = await res.json();
    console.log("[clearCartServer] response:", data);
    return data;
  } catch (err: any) {
    console.error("[clearCartServer] error:", err);
    return { status: "error", message: err.message || String(err) };
  }
}
