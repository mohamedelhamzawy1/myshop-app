"use client"
import { CartResponse } from "@/interfaces/Cart";
import { getUserToken } from "@/types/getUserToken/getUserToken";
import { useSession } from "next-auth/react";
import { Children, createContext, ReactNode, useContext, useEffect, useState } from "react";

export const CartContext=createContext <{
    cartData: CartResponse|null,
    setCartData:(value:CartResponse|null)=>void,
    isLoading:boolean,
    setIsLoading:(value:boolean)=>void,
    getCart:()=>void,
 

}> ({
     cartData: null,
    setCartData:()=>{},
    isLoading:false,
    setIsLoading:()=>{},
    getCart (){},

});
import React from 'react'

export default function CartContextProvider({children}:{children:ReactNode}) {

    const [cartData,setCartData]=useState<CartResponse|null>(null)
const [isLoading,setIsLoading]=useState(true)
const [userId,setUserId]=useState<string>('')
 useContext(CartContext)

async function getCart() {
      const token=await getUserToken()
  if(session.status=='authenticated'){

  
    const response=await fetch("https://ecommerce.routemisr.com/api/v1/cart",
        {
            headers:{
                token:token+''
               }
        }
    );
    const data: CartResponse = await response.json();
  setCartData(data);

  if (data?.data.cartOwner) {
    localStorage.setItem("userId", data.data.cartOwner);
  }

  setIsLoading(false);
}
}
const session=useSession()
useEffect(()=>{
  if(session.status=='authenticated'){
     getCart()
  }


},[session.status])
  return <CartContext.Provider value={{cartData,setCartData,isLoading,setIsLoading,getCart}}>
  {children}
  </CartContext.Provider>
}
