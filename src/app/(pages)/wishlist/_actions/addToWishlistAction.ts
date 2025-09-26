"use server";
import { getUserToken } from "@/types/getUserToken/getUserToken";

export async function addToWishlistServer(productId: string) {
  try {
    const token = await getUserToken();
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token + "",
      },
      body: JSON.stringify({ productId }),
    });

    return await res.json();
  } catch (err: any) {
    return { status: "error", message: err.message || String(err) };
  }
}
