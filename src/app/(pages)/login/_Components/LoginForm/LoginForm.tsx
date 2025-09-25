"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
 import {signIn} from "next-auth/react"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { useSearchParams } from "next/navigation"
import { useState } from "react"
import { Loader2 } from "lucide-react"
 
const formSchema = z.object({
  email: z.email().nonempty("email is required").regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"invalid email"), 
  password: z.string().nonempty("password is required").regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,"invalid password")
  })

 
export function LoginForm() {

    const [isLoading,setIsLoading]=useState<boolean>(false)

    let searchParams=useSearchParams();

   // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password:""
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
   const response = await signIn('credentials',{
    callbackUrl:'/',
    redirect:true,
    email:values.email,
    password:values.password,
});
setIsLoading(false)
console.log(response)
  }



  return (
    <Card className="p-6 w-sm">
    <Form {...form}>
        {searchParams.get('error') ? <h1 className="text-destructive text-center text-2xl">{searchParams.get('error')}</h1>:'' }
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="mohamed@example.com" type="email" {...field} />
              </FormControl>
            
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Password@123" type="password" {...field} />
              </FormControl>
            
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoading} className="w-full cursor-pointer" type="submit"> {isLoading && <Loader2 className="animate-spin" />} Submit</Button>
      </form>
    </Form>
    </Card>
  )
}