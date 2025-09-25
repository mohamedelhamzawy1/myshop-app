"use client";
import React, { useContext } from "react";
import { WishlistContext } from "@/components/Context/wishlistcontext";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import AddToCart from "@/components/AddToCart/AddToCart";

export default function WishlistPage() {
  const { wishlistData, isLoading, removeFromWishlist } =
    useContext(WishlistContext);

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <Loader2 className="animate-spin text-red-500 mb-4" size={48} />
        <p className="text-gray-700 text-lg font-semibold">
          Loading your wishlist...
        </p>
      </div>
    );

  if (!wishlistData || wishlistData.length === 0)
    return (
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <p className="text-gray-700 text-xl font-semibold mb-4">
          Your wishlist is empty 
        </p>
        <Link
          href="/Products"
        >
          <Button>
          Browse Products</Button>
        </Link>
      </div>
    );

  return (
    <div className="flex flex-wrap container mx-auto px-4">
      {wishlistData.map((product) => (
        <div
          key={product.id}
          className="mx-auto w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2"
        >
          <Card>
            <Link href={"/Products/" + product.id}>
              <Image
                src={product.imageCover}
                alt={product.title}
                width={300}
                height={300}
                className="w-full"
              />
              <CardHeader>
                <CardTitle className="truncate w-full">
                  {product.title}
                </CardTitle>
                <CardDescription>{product.category?.name}</CardDescription>
                <CardAction>{product.brand?.name}</CardAction>
              </CardHeader>
            </Link>
            <CardContent>
              <p className="pt-4">
                Price: <span className="font-bold">{product.price} EGP</span>
              </p>
            </CardContent>
            <CardFooter>
         <AddToCart productId={product.id} />
            </CardFooter>
          </Card>
        </div>
      ))}
    </div>
  );
}
