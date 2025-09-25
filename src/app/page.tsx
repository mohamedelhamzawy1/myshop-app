"use client";

import React, { useEffect, useState } from "react";
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
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const [categories, setCategories] = useState<CategoryI[]>([]);
  const [products, setProducts] = useState<ProductI[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [categoriesRes, productsRes] = await Promise.all([
          fetch("https://ecommerce.routemisr.com/api/v1/categories"),
          fetch("https://ecommerce.routemisr.com/api/v1/products?limit=8"),
        ]);

        const categoriesData = await categoriesRes.json();
        const productsData = await productsRes.json();

        setCategories(categoriesData.data || []);
        setProducts(productsData.data || []);
      } catch (err) {
        console.error("Home load error:", err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-10">

 <section className="text-center mb-16">
        <h1 className="text-4xl font-extrabold mb-4">
          Welcome to <span className="text-black">Our E-Shop</span>
        </h1>
        <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
          Discover the best deals, top brands, and exclusive collections.
          Shop with confidence and find everything you need in one place.
        </p>
        <Link href="/Products">
          <button className="px-8 py-3 bg-black hover:bg-gray-800 text-white rounded-lg shadow-lg text-lg">
            See All Products
          </button>
        </Link>
      </section>

      {/* Categories */}
      <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-12">
        {categories.map((cat) => (
          <Link
            key={cat._id}
            href={`/categories/${cat._id}`}
            className="group border rounded-lg p-3 flex flex-col items-center hover:shadow"
          >
            {cat.image ? (
              <Image
                src={cat.image}
                alt={cat.name}
                width={120}
                height={120}
                className="w-24 h-24 object-contain"
              />
            ) : (
              <div className="w-24 h-24 flex items-center justify-center bg-gray-100 text-gray-400 rounded">
                No Image
              </div>
            )}
            <span className="mt-2 text-sm font-medium text-center group-hover:text-blue-600">
              {cat.name}
            </span>
          </Link>
        ))}
      </div>

      {/* Featured Products */}
      <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card key={product.id}>
            <Link href={`/Products/${product.id}`}>
              <Image
                src={product.imageCover}
                alt={product.title}
                width={300}
                height={300}
                className="w-full h-48 object-contain"
              />
              <CardHeader>
                <CardTitle className="truncate">{product.title}</CardTitle>
                <CardDescription>{product.category?.name}</CardDescription>
              </CardHeader>
            </Link>
            <CardContent>
              <p className="text-sm text-gray-500">{product.brand?.name}</p>
              <p className="pt-2">
                Price:{" "}
                <span className="font-bold">{product.price} EGP</span>
              </p>
            </CardContent>
            <CardFooter>
              <AddToCart productId={product.id} />
            </CardFooter>
          </Card>
        ))}
      </div>

   
    </div>
  );
}
