"use client"
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import Navbar from "@/components/navbar/Navbar";
import { Toaster } from "react-hot-toast";
import CartContextProvider from "@/components/Context/cartContext";
import WishlistContextProvider from "@/components/Context/wishlistcontext";
import { SearchProvider } from "@/components/Context/searchcontext";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
export default function Provider({children}:{children:ReactNode}) {
  return (
    <div>
       <SessionProvider>
             <CartContextProvider>
               <WishlistContextProvider>
                 <SearchProvider>
                
                <Navbar/>
              <div className="continer mx-auto py-3">
      
                {children}
              </div>
              
              <Toaster/>
              </SearchProvider> 
              </WishlistContextProvider>
            </CartContextProvider>
            
           </SessionProvider>
    </div>
  )
}
