"use server";
import { getUserToken } from "@/types/getUserToken/getUserToken";

export async function getWishlistServer() {
  try {
    const token = await getUserToken();
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
      headers: { token: token + "" },
      cache: "no-store",
    });

    return await res.json();
  } catch (err: any) {
    return { status: "error", message: err.message || String(err) };
  }
}
