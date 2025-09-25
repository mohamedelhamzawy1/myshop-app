"use server"
import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";
import { getUserToken } from "@/types/getUserToken/getUserToken";

export async function addToCartServer(productId: string) {
  try {

    const token=await getUserToken()

    // Use raw cookie token, do NOT decode it
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
      method: "POST",
      body:JSON.stringify({productId}),
      headers: {
        "Content-Type": "application/json",
        token: token+'',  // <-- use raw token
      },
     
    });

    const data = await res.json();
    return data;
  } catch (err: any) {
    return { status: "error", message: err.message };
  }
}


