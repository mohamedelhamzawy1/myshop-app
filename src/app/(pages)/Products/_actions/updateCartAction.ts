"use server";
import { getUserToken } from "@/types/getUserToken/getUserToken";

export async function updateCartServer(productId: string, count: number) {
  try {
    const token = await getUserToken();
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      {
        method: "PUT",
        body: JSON.stringify({ count }),
        headers: {
          "Content-Type": "application/json",
          token: token + "",
        },
      }
    );

    return await res.json();
  } catch (err: any) {
    return { status: "error", message: err.message || String(err) };
  }
}
