"use server";

import { getUserToken } from "@/types/getUserToken/getUserToken";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://ecommerce.routemisr.com/api/v1";

export async function addToCartServer(productId: string) {
  try {
    const token = await getUserToken();

    const res = await fetch(`${API_URL}/cart`, {
      method: "POST",
      body: JSON.stringify({ productId }),
      headers: {
        "Content-Type": "application/json",
        token: token + "",
      },
    });

    return await res.json();
  } catch (err: unknown) {
    if (err instanceof Error) {
      return { status: "error", message: err.message };
    }
    return { status: "error", message: String(err) };
  }
}
