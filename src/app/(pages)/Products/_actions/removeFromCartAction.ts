"use server";

import { getUserToken } from "@/types/getUserToken/getUserToken";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://ecommerce.routemisr.com/api/v1";

export async function removeFromCartServer(productId: string) {
  try {
    const token = await getUserToken();

    const res = await fetch(`${API_URL}/cart/${productId}`, {
      method: "DELETE",
      headers: { token: token + "" },
    });

    return await res.json();
  } catch (err: any) {
    return { status: "error", message: err.message || String(err) };
  }
}
