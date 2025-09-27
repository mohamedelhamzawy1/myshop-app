"use server";
import { getUserToken } from "@/types/getUserToken/getUserToken";

export async function addToWishlistServer(productId: string) {
  try {
    const token = await getUserToken();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/wishlist`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token + "",
        },
        body: JSON.stringify({ productId }),
      }
    );

    return await res.json();
  } catch (err: any) {
    console.error("Error in addToWishlistServer:", err);
    return { status: "error", message: err.message || String(err) };
  }
}
