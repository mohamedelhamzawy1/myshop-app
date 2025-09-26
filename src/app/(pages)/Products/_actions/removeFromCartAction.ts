"use server";
import { getUserToken } from "@/types/getUserToken/getUserToken";

export async function removeFromCartServer(productId: string) {
  try {
    const token = await getUserToken();
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      {
        method: "DELETE",
        headers: { token: token + "" },
      }
    );

    return await res.json();
  } catch (err: any) {
    return { status: "error", message: err.message || String(err) };
  }
}
