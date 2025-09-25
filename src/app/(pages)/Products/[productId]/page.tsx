import { ProductI } from '@/interfaces/product';
import { Params } from 'next/dist/server/request/params';
import React from 'react'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { HeartIcon, ShoppingCart, StarHalfIcon } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import AddToCart from '@/components/AddToCart/AddToCart';
import RatingStars from '@/components/RatingStars/RatingStars';
export default async function ProductDetails({params}: { params : Params }) {

    const {productId}= params;

    const response = await fetch('https://ecommerce.routemisr.com/api/v1/products/'+productId);

    const {data:product} : {data:ProductI}=await response.json()

  return <>
   <Card className='grid md:grid-cols-3 items-center m-9'>
      
      <div className="grid-cols-1"> 
<Carousel>
  <CarouselContent>
    {product.images.map((img,index)=><CarouselItem key={index}>
       <Image src={img} alt={product.title} width={500} height={500} className='w-full cursor-grab'/>
        </CarouselItem> )}
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>

        
      </div>
    <div className="md:grid-cols-2 space-y-4">
        <CardHeader className='space-y-2'>
    <CardTitle className='font-light'>{product.brand.name}</CardTitle>
    <CardTitle className='text-2xl'> {product.title} </CardTitle>
    <CardDescription>{product.description}</CardDescription>
    <CardDescription>{product.category.name}</CardDescription>
    <div className="flex">
     <CardContent>
  <RatingStars rating={product.ratingsAverage} />
  <p className="pt-4">
    Price: <span className="font-bold">{product.price} EGP</span>
  </p>
</CardContent>

      <p>{product.ratingsAverage}</p>
      <p>{product.ratingsQuantity} <span className='text-blue-500 text-sm'>Reviews</span></p>
    
    </div> 
     <p className='text-sm text-gray-600'>{product.quantity}  <span className='font-semibold text-gray-800"'>Available Stock</span></p>
  </CardHeader>
  </div>

   <div className="flex flex-col  justify-end h-full w-full mb-9">
  <p className="text-lg font-bold mb-4">
    Price: {product.price} EGP
  </p>
  
 <AddToCart productId={product.id} />
 
</div>
  
   
</Card>
   
  
  </>
}
