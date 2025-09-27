"use server";
import { getUserToken } from "@/types/getUserToken/getUserToken";

export async function getWishlistServer() {
  try {
    const token = await getUserToken();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/wishlist`,
      {
        headers: { token: token + "" },
        cache: "no-store",
      }
    );

    return await res.json();
  } catch (err: any) {
    console.error("Error in getWishlistServer:", err);
    return { status: "error", message: err.message || String(err) };
  }
}
