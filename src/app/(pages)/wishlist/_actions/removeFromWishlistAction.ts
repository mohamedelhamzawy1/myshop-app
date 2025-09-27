"use server";
import { getUserToken } from "@/types/getUserToken/getUserToken";

export async function removeFromWishlistServer(productId: string) {
  try {
    const token = await getUserToken();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/wishlist/${productId}`,
      {
        method: "DELETE",
        headers: { token: token + "" },
      }
    );

    return await res.json();
  } catch (err: any) {
    console.error("Error in removeFromWishlistServer:", err);
    return { status: "error", message: err.message || String(err) };
  }
}
