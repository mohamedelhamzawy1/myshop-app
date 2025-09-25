"use client"
import Link from "next/link"
import React, { useContext } from 'react'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList
} from "@/components/ui/navigation-menu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Loader2, ShoppingCart, UserIcon } from "lucide-react"
import { Badge } from "../ui/badge"
import { usePathname } from "next/navigation";
import { CartContext } from "../Context/cartContext"
import { useSearch } from "../Context/searchcontext"  // <-- import context
import { signOut, useSession } from "next-auth/react"

export default function Navbar() {
  const pathname=usePathname();
  const {isLoading, cartData} = useContext(CartContext)
  const { search, setSearch } = useSearch(); // <-- use search context

  const session=useSession()
  console.log(session)

  return (
    <nav className="py-3 bg-gray-200 font-semibold sticky top-0 z-50" >
      <div className="container mx-auto">
        <div className="flex items-center justify-around">
          <h1> <Link href={'/'}> MyShop</Link></h1>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/Products">products</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/categories">Categories</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/brands">Brands</Link>
                </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                 <NavigationMenuLink asChild>
                  <Link href="/wishlist">wishlist</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Search input */}
         {pathname.startsWith("/Products")  && (
        <div className="flex items-center gap-2">
          <label htmlFor="search" className="sr-only">
            Search
          </label>
         <input
    type="text"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    placeholder="Search products..."
    className="border border-gray-400 rounded px-9 py-1 ml-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
  />
        </div>
      )}
          <div className="flex items-center gap-6">
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-0"> 
                <UserIcon className="cursor-pointer"/> 
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {session.status=='authenticated' ? <>
                   <Link href={'/profile'}><DropdownMenuItem>Profile</DropdownMenuItem></Link>
                  <DropdownMenuItem onClick={()=>signOut({
                    callbackUrl:"/"
                  })}>Logout</DropdownMenuItem>
                </>:<>
                <Link href={'/login'}><DropdownMenuItem>Login</DropdownMenuItem></Link>
                <Link href={'/register'}><DropdownMenuItem>Register</DropdownMenuItem></Link>
                </>
                }
             

              </DropdownMenuContent>
            </DropdownMenu>

            {
              session.status== 'authenticated'&& <Link href={'/cart'}>
              <div className="relative p-2">
                <ShoppingCart  className="cursor-pointer"/>
                <Badge className="h-4 min-w-3 rounded-full p-1 font-mono tabular-nums absolute top-0 end-0">
                  {isLoading ? <Loader2 className="animate-spin"/> : cartData?.numOfCartItems}
                </Badge>
              </div>
            </Link>
            }
          </div>
        </div>
      </div>
    </nav>
  )
}
