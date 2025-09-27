"use server";

import { getUserToken } from "@/types/getUserToken/getUserToken";

export async function createCheckout(
  cartId: string,
  shippingAddress: any,
  method: "online" | "cash"
) {
  try {
    const token = await getUserToken();
    if (!token) {
      return { status: "error", message: "User not authenticated" };
    }

    const url =
      method === "online"
        ? `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${process.env.NEXT_URL}`
        : `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify({ shippingAddress }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Checkout API error:", res.status, text);
      return { status: "error", message: text };
    }

    return await res.json();
  } catch (err: any) {
    console.error("Checkout error:", err);
    return { status: "error", message: err.message || String(err) };
  }
}
