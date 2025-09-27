"use server";

import { getUserToken } from "@/types/getUserToken/getUserToken";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://ecommerce.routemisr.com/api/v1";

export async function getCartServer() {
  try {
    const token = await getUserToken();

    const res = await fetch(`${API_URL}/cart`, {
      headers: { token: token + "" },
      cache: "no-store",
    });

    return await res.json();
  } catch (err: any) {
    return { status: "error", message: err.message || String(err) };
  }
}
