"use client";

import React, { useContext, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Trash2,
  Minus,
  Plus,
  Loader2,
  ShoppingCart,
} from "lucide-react";
import { CartContext } from "@/components/Context/cartContext";
import Loading from "@/components/ui/loading";
import Link from "next/link";
import { CartResponse } from "@/interfaces/Cart";
import toast from "react-hot-toast";
import Checkout from "@/components/Checkout/Checkout";

import { removeFromCartServer } from "@/app/(pages)/Products/_actions/removeFromCartAction";

import { updateCartServer } from "@/app/(pages)/Products/_actions/updateCartAction";
import { clearCartServer } from "../Products/_actions/clearCartAction";

export default function Cart() {
  const { isLoading, cartData, setCartData } = useContext(CartContext);

  const [removeId, setRemoveID] = useState<string | null>(null);
  const [updateId, setUpdateID] = useState<string | null>(null);
  const [isClearing, setIsClearing] = useState<boolean>(false);

  async function removeCartItem(productId: string) {
    setRemoveID(productId);
    const data: CartResponse = await removeFromCartServer(productId);

    if (data.status === "success") {
      toast.success("Product Removed Succesfully");
      setCartData(data);
    } else {
      toast.error(data.message || "Failed to remove product");
    }
    setRemoveID(null);
  }

  async function clearCart() {
    setIsClearing(true);
    const data: CartResponse = await clearCartServer();

    if (data.message === "success") {
      setCartData(null);
    }
    setIsClearing(false);
  }

  async function updateCartCount(productId: string, count: number) {
    setUpdateID(productId);
    const data: CartResponse = await updateCartServer(productId, count);

    if (data.status === "success") {
      setCartData(data);
      toast.success("Cart updated successfully");
    } else {
      toast.error("Failed to update cart");
    }

    setUpdateID(null);
  }

  const isCartEmpty = !cartData?.data?.products?.length;

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : isCartEmpty ? (
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
          <ShoppingCart className="w-16 h-16 mb-4" />
          <h2 className="text-2xl font-bold text-gray-700 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-500 mb-6">
            Looks like you haven’t added anything yet.  
            Start shopping and fill your cart!
          </p>
          <Link href="/Products">
            <Button className="w-full bg-black text-white py-3 rounded-full hover:bg-gray-800 transition">
              🛍️ Continue Shopping
            </Button>
          </Link>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-10">
          <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {cartData.data?.products?.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col sm:flex-row items-center justify-between gap-6 p-4 border rounded-lg shadow-sm bg-white"
                >
                  <Image
                    src={item.product.imageCover || "/placeholder.jpg"}
                    alt={item.product.title}
                    width={100}
                    height={100}
                    className="rounded-md object-cover w-28 h-28"
                  />

                  <div className="flex flex-col flex-grow w-full space-y-1">
                    <h2 className="text-lg font-semibold">
                      {item.product.title}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {item.product.brand.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      Category: {item.product.category.name}
                    </p>
                    <Button
                      onClick={() => removeCartItem(item.product.id)}
                      variant="link"
                      className="text-red-500 text-sm w-fit p-0 mt-1"
                      disabled={removeId === item.product.id}
                    >
                      {removeId === item.product.id ? (
                        <Loader2 className="w-4 h-4 animate-spin inline-block mr-1" />
                      ) : (
                        <Trash2 className="w-4 h-4 inline-block mr-1" />
                      )}
                      Remove
                    </Button>
                  </div>

                  <div className="flex flex-col items-end justify-between h-full gap-4">
                    <div className="flex items-center gap-2 border rounded px-2 py-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-6 w-6 p-0"
                        onClick={() =>
                          updateCartCount(item.product.id, item.count - 1)
                        }
                        disabled={
                          updateId === item.product.id || item.count === 1
                        }
                      >
                        {updateId === item.product.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Minus className="w-4 h-4" />
                        )}
                      </Button>

                      <span className="text-sm font-medium">{item.count}</span>

                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-6 w-6 p-0"
                        onClick={() =>
                          updateCartCount(item.product.id, item.count + 1)
                        }
                      >
                        {updateId === item.product.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Plus className="w-4 h-4" />
                        )}
                      </Button>
                    </div>

                    <div className="text-right">
                      <p className="text-sm text-gray-500">Price</p>
                      <p className="text-lg font-bold">
                        {(item.price ?? item.product.price)?.toLocaleString()}{" "}
                        EGP
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <Button
                onClick={clearCart}
                className="w-full flex items-center mb-6 gap-2 px-6 grow text-lg font-semibold rounded-full bg-neutral-200 text-destructive shadow-md hover:bg-neutral-300 transition-colors duration-300 sticky top-20"
                disabled={isClearing}
              >
                {isClearing ? (
                  <Loader2 className="w-5 h-5 animate-spin inline-block mr-2" />
                ) : (
                  <Trash2 className="w-5 h-5 inline-block mr-2" />
                )}
                Clear Cart
              </Button>

              <div className="bg-gray-50 p-6 rounded-lg border shadow-sm h-fit flex flex-col gap-6 sticky top-32">
                <h2 className="text-xl font-semibold">Order Summary</h2>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>
                      {cartData?.data?.totalCartPrice?.toLocaleString() ?? 0} EGP
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery</span>
                    <span>50 EGP</span>
                  </div>
                </div>

                <hr />

                <div className="space-y-2">
                  <label
                    htmlFor="discount"
                    className="text-sm font-medium text-gray-700"
                  >
                    Promo / Discount Code
                  </label>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      id="discount"
                      placeholder="Enter code"
                      className="flex-grow border rounded px-3 py-2 text-sm outline-none focus:ring focus:ring-blue-200"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="text-sm"
                      onClick={() => {
                        const message =
                          document.getElementById("promo-msg");
                        message?.classList.remove("hidden");
                      }}
                    >
                      Apply
                    </Button>
                  </div>

                  <p id="promo-msg" className="text-sm text-red-500 hidden">
                    Invalid promo code
                  </p>
                </div>

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>
                    {(
                      (cartData?.data?.totalCartPrice ?? 0) + 50
                    ).toLocaleString()}{" "}
                    EGP
                  </span>
                </div>

                <Checkout cartId={cartData?.cartId} />

                <Link href={"/Products"}>
                  <Button
                    variant="ghost"
                    className="w-full text-sm text-gray-600 hover:text-black cursor-pointer"
                  >
                    ← Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
