"use client";

import React, { useContext, useEffect, useState } from "react";
import { Heart, Loader2 } from "lucide-react";
import { WishlistContext } from "@/components/Context/wishlistcontext";

export default function WishlistButton({ productId }: { productId: string }) {
  const { wishlistData, getWishlist, addToWishlist, removeFromWishlist } =
    useContext(WishlistContext);

  const [isLoading, setIsLoading] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    if (wishlistData) {
      setIsInWishlist(wishlistData.some((item) => item.id === productId));
    }
  }, [wishlistData, productId]);

  async function handleToggleWishlist() {
    setIsLoading(true);
    try {
      if (isInWishlist) {
        await removeFromWishlist(productId);
      } else {
        await addToWishlist(productId);
      }
      await getWishlist(); 
    } catch (err) {
      console.error("Error in handleToggleWishlist:", err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <button
      onClick={handleToggleWishlist}
      className="p-2 rounded-full hover:bg-gray-100 transition"
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2 className="w-5 h-5 animate-spin text-red-500" />
      ) : (
        <Heart
          className={`w-5 h-5 ${
            isInWishlist ? "fill-red-500 text-red-500" : "text-gray-500"
          }`}
        />
      )}
    </button>
  );
}
