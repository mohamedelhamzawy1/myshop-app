"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ProductI } from "@/interfaces/product";
import toast from "react-hot-toast";

export const WishlistContext = createContext<{
  wishlistData: ProductI[] | null;
  setWishlistData: (value: ProductI[] | null) => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  getWishlist: () => void;
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
}>({
  wishlistData: null,
  setWishlistData: () => {},
  isLoading: false,
  setIsLoading: () => {},
  getWishlist() {},
  addToWishlist() {},
  removeFromWishlist() {},
});

export default function WishlistContextProvider({ children }: { children: ReactNode }) {
  const [wishlistData, setWishlistData] = useState<ProductI[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useContext(WishlistContext);

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YjZlMzFlY2E0NWFiOWY5MWEwZWNlMCIsIm5hbWUiOiJBZGFtIE1vaGFtZWQiLCJyb2xlIjoidXNlciIsImlhdCI6MTc1ODM5NzA4NCwiZXhwIjoxNzY2MTczMDg0fQ.AI64KFTTJ5PsnP4gL1ynKlR81IwFQqyHTO7JTO4UHuA";

  async function getWishlist() {
    try {
      const response = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
        headers: { token },
      });
      const data = await response.json();
      setWishlistData(data?.data || []);
    } catch (error) {
      console.error("Get wishlist failed:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function addToWishlist(productId: string) {
    try {
      const response = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
        method: "POST",
        headers: {
          token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      });
      const data = await response.json();

      if (data?.data) {
        setWishlistData(data.data);     
           toast.success("Added successfully to wishlist");

      } else {
        setWishlistData((prev) => prev ? [...prev, { id: productId } as ProductI] : [{ id: productId } as ProductI]);
      }
    } catch (error) {
      console.error("Add to wishlist failed:", error);
    }
  }

  async function removeFromWishlist(productId: string) {
    try {
      await fetch(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        {
          method: "DELETE",
          headers: { token },
        }
      );
      setWishlistData((prev) => prev ? prev.filter((item) => item.id !== productId) : []);
       toast.success("Removed successfully from wishlist");
    } catch (error) {
      console.error("Remove from wishlist failed:", error);
    }
  }

  useEffect(() => {
    getWishlist();
  }, []);

  return (
    <WishlistContext.Provider
      value={{
        wishlistData,
        setWishlistData,
        isLoading,
        setIsLoading,
        getWishlist,
        addToWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
