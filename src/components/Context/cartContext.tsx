"use client";

import { CartResponse } from "@/interfaces/Cart";
import { getCartServer } from "@/app/(pages)/Products/_actions/getCartAction";
import { useSession } from "next-auth/react";
import {
  Children,
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export const CartContext = createContext<{
  cartData: CartResponse | null;
  setCartData: (value: CartResponse | null) => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  getCart: () => void;
}>({
  cartData: null,
  setCartData: () => {},
  isLoading: false,
  setIsLoading: () => {},
  getCart() {},
});

export default function CartContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [cartData, setCartData] = useState<CartResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const session = useSession();

  async function getCart() {
    setIsLoading(true);
    const data: CartResponse = await getCartServer();

    if (data?.status === "success") {
      setCartData(data);

      if (data?.data?.cartOwner) {
        localStorage.setItem("userId", data.data.cartOwner);
      }
    }
    setIsLoading(false);
  }

  useEffect(() => {
    if (session.status === "authenticated") {
      getCart();
    }
  }, [session.status]);

  return (
    <CartContext.Provider
      value={{ cartData, setCartData, isLoading, setIsLoading, getCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
