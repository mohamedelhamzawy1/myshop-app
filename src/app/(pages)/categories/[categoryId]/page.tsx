"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { CategoryI } from "@/interfaces/category";
import { ProductI } from "@/interfaces/product";
import AddToCart from "@/components/AddToCart/AddToCart";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { StarHalfIcon } from "lucide-react";
import RatingStars from "@/components/RatingStars/RatingStars";

export default function CategoryDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { categoryId } = params as { categoryId: string };

  const [category, setCategory] = useState<CategoryI | null>(null);
  const [products, setProducts] = useState<ProductI[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!categoryId) return;

    async function load() {
      setIsLoading(true);
      setError(null);

      try {
        const r1 = await fetch(
          `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}`
        );
        if (!r1.ok) throw new Error(`Category ${r1.status}`);
        const j1 = await r1.json();
        setCategory(j1.data || null);

        const r2 = await fetch(
          `https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}`
        );
        if (!r2.ok) throw new Error(`Products ${r2.status}`);
        const j2 = await r2.json();
        setProducts(j2.data || []);
      } catch (e) {
        console.error("CategoryDetails load error:", e);
        setError("Failed to load category or its products.");
      } finally {
        setIsLoading(false);
      }
    }

    load();
  }, [categoryId]);

  if (!categoryId) return <div className="p-8">Invalid category id</div>;

  if (isLoading)
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-600 py-10">
        {error}
        <div className="mt-4">
          <button className="underline" onClick={() => router.back()}>
            Go back
          </button>
        </div>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-10">
      {category && (
        <div className="flex items-center gap-6 mb-8">
          {category.image ? (
            <img
              src={category.image}
              alt={category.name}
              className="w-28 h-28 object-contain border rounded"
            />
          ) : (
            <div className="w-28 h-28 bg-gray-100 border rounded flex items-center justify-center text-gray-500">
              No image
            </div>
          )}
          <div>
            <h1 className="text-2xl font-bold">{category.name}</h1>
            <p className="text-sm text-gray-500">Slug: {category.slug}</p>
          </div>
        </div>
      )}

      <h2 className="text-xl font-semibold mb-4">
        Products in {category?.name}
      </h2>

      <div className="flex flex-wrap container mx-auto px-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="mx-auto w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2"
          >
            <Card>
              <Link href={`/Products/${product.id}`}>
                <Image
                  src={product.imageCover}
                  alt={product.title}
                  width={300}
                  height={300}
                  className="w-full"
                />
                <CardHeader>
                  <CardTitle className="truncate w-full">
                    {product.title}
                  </CardTitle>
                  <CardDescription>
                    {product.category?.name}
                  </CardDescription>
                  <p className="text-sm text-gray-500">
                    {product.brand?.name}
                  </p>
                </CardHeader>
              </Link>
 <div className="flex">
                  
                 <div className="flex">
                  <RatingStars rating={product.ratingsAverage} />
                   <p className=''>{product.ratingsAverage}</p></div>
                </div>
              <CardContent>
               
                <p className="pt-2">
                  Price:{" "}
                  <span className="font-bold">{product.price} EGP</span>
                </p>
              </CardContent>

              <CardFooter className="gap-2">
                <AddToCart productId={product.id} />
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
