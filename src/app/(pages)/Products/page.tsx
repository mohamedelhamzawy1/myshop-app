"use client";
import React, { useEffect, useState } from 'react';
import { ProductI } from '@/interfaces/product';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from 'next/image';
import AddToCart from '@/components/AddToCart/AddToCart';
import { useSearch } from '@/components/Context/searchcontext';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import RatingStars from '@/components/RatingStars/RatingStars';

export default function Products() {
  const [products, setProducts] = useState<ProductI[]>([]);
  const [loading, setLoading] = useState(true);
  const { search } = useSearch();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('https://ecommerce.routemisr.com/api/v1/products', {
          next: { revalidate: 5 * 60 },
        });
        const data = await response.json();
        setProducts(data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(search.toLowerCase()) ||
     product.category.name.toLowerCase().includes(search.toLowerCase()) ||
       product.brand.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return  <div className="flex flex-col items-center justify-center h-[70vh]">
        <Loader2 className="animate-spin text-blue-500 mb-4" size={48} />
        <p className="text-gray-700 text-lg font-semibold">
          Loading the coolest products for you...
        </p>
      </div>;

  return (
    <div className="flex flex-wrap container mx-auto px-4">
      {filteredProducts.length === 0 && (
        <p className="w-full text-center py-10">No products found</p>
      )}

      {filteredProducts.map((product) => (
        <div key={product.id} className='mx-auto w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2'>
          <Card>
            <Link href={'/Products/' + product.id}>
              <Image src={product.imageCover} alt={product.title} width={300} height={300} className='w-full'/>
              <CardHeader>
                <CardTitle className='truncate w-full'>{product.title}</CardTitle>
                <CardDescription>{product.category.name}</CardDescription>
                <CardAction>{product.brand.name}</CardAction>
              </CardHeader>
            </Link>
            <div className="flex"><RatingStars rating={product.ratingsAverage} />
               <p className=''>{product.ratingsAverage}</p></div>
             
            <CardContent>
              <p className='pt-4'>Price: <span className='font-bold'>{product.price} EGP</span></p>
            </CardContent>
            <CardFooter>
              <AddToCart productId={product.id} />
            </CardFooter>
          </Card>
        </div>
      ))}
    </div>
  );
}
