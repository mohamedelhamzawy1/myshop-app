"use client";

import { createContext, ReactNode, useEffect, useState } from "react";
import { ProductI } from "@/interfaces/product";
import toast from "react-hot-toast";
import { getWishlistServer } from "@/app/(pages)/wishlist/_actions/getWishlistAction";
import { addToWishlistServer } from "@/app/(pages)/wishlist/_actions/addToWishlistAction";
import { removeFromWishlistServer } from "@/app/(pages)/wishlist/_actions/removeFromWishlistAction";
import { useSession } from "next-auth/react";

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

export default function WishlistContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [wishlistData, setWishlistData] = useState<ProductI[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { status } = useSession();

  async function getWishlist() {
    setIsLoading(true);
    const data = await getWishlistServer();

    if (data?.status === "success" && data?.data) {
      setWishlistData(data.data);
    } else {
      setWishlistData([]);
    }

    setIsLoading(false);
  }

  async function addToWishlist(productId: string) {
    const data = await addToWishlistServer(productId);

    if (data?.status === "success") {
      toast.success("Added successfully to wishlist");
      await getWishlist(); // ✅ refresh after add
    } else {
      toast.error(data?.message || "Failed to add to wishlist");
    }
  }

  async function removeFromWishlist(productId: string) {
    const data = await removeFromWishlistServer(productId);

    if (data?.status === "success") {
      toast.success("Removed successfully from wishlist");
      await getWishlist(); // ✅ refresh after remove
    } else {
      toast.error(data?.message || "Failed to remove from wishlist");
    }
  }

  useEffect(() => {
    if (status === "authenticated") {
      getWishlist();
    }
  }, [status]);

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
