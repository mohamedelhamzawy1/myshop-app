"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Loader2, StarHalfIcon } from "lucide-react";
import AddToCart from "@/components/AddToCart/AddToCart";
import { ProductI } from "@/interfaces/product";
import { Brand } from "@/interfaces/brand";


import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import RatingStars from "@/components/RatingStars/RatingStars";

export default function BrandDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const brandId = params?.brandId ?? params?.id;

  const [brand, setBrand] = useState<Brand | null>(null);
  const [products, setProducts] = useState<ProductI[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!brandId) return;
    setLoading(true);
    setErr(null);

    async function load() {
      try {
        const r1 = await fetch(
          `https://ecommerce.routemisr.com/api/v1/brands/${brandId}`
        );
        if (!r1.ok) throw new Error(`Brand ${r1.status}`);
        const j1 = await r1.json();
        setBrand(j1.data ?? null);

        const r2 = await fetch(
          `https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}`
        );
        if (!r2.ok) throw new Error(`Products ${r2.status}`);
        const j2 = await r2.json();
        setProducts(j2.data ?? []);
      } catch (e) {
        console.error("BrandDetails error:", e);
        setErr("Failed to load brand data.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [brandId]);

  if (!brandId) return <div className="p-8">Invalid brand</div>;

  if (loading)
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );

  if (err)
    return (
      <div className="p-8 text-center text-red-600">
        {err}
        <div className="mt-4">
          <button className="underline" onClick={() => router.back()}>
            Go back
          </button>
        </div>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex items-center gap-6 mb-8">
        <div className="w-28 h-28 relative rounded-md overflow-hidden bg-white border">
          {brand?.image ? (
            <Image
              src={brand.image}
              alt={brand.name}
              fill
              className="object-contain"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-sm text-gray-500">
              No image
            </div>
          )}
        </div>
        <div>
          <h1 className="text-2xl font-bold">{brand?.name}</h1>
          {brand?.slug && (
            <p className="text-sm text-gray-500">/{brand.slug}</p>
          )}
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">
        Products by {brand?.name}
      </h2>

      {products.length === 0 ? (
        <div className="text-center text-gray-600 py-20">
          No products found for this brand.
        </div>
      ) : (
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
                                  <div className="flex">
                                   <RatingStars rating={product.ratingsAverage} />
                                    <p className=''>{product.ratingsAverage}</p></div>
                                 </div>
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
      )}
    </div>
  );
}
