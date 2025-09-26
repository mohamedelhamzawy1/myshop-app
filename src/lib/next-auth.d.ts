import { USerResponse } from "@/interfaces/login"
import NextAuth, { User } from "next-auth"

declare module "next-auth" {
  
  interface JWT {
    user: USerResponse;
    token: string;
  }

  interface Session {
      user: USerResponse,

  }
 interface User{
   user: USerResponse,
   token:string
  }

}
import { JWT } from "next-auth/jwt"

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    user: USerResponse;
    token: string;
  }

}