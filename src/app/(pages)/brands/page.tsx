"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Brand, BrandsResponse } from "@/interfaces/brand";

export default function BrandsPage() {
  const router = useRouter();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchBrands(pageNum: number) {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `https://ecommerce.routemisr.com/api/v1/brands?page=${pageNum}`
      );

      if (!res.ok) {
        setError("Failed to load brands.");
        setLoading(false);
        return;
      }

      const data: BrandsResponse = await res.json();

      const list = data.data ? data.data : [];
      setBrands(prev => [...prev, ...list]);

      if (data.metadata && data.metadata.nextPage) {
        setHasMore(true);
        setPage(data.metadata.nextPage);
      } else {
        setHasMore(false);
      }

    } catch (err) {
      console.log("Error fetching brands:", err);
      setError("Failed to load brands.");
    }

    setLoading(false);
  }

  useEffect(() => {
    fetchBrands(1);
  }, []);

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Brands</h1>

      {error && <div className="text-center text-red-600 mb-6">{error}</div>}

      {loading && brands.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[50vh] text-center">
          <Loader2 className="animate-spin w-10 h-10 text-blue-500 mb-4" />
          <p className="text-gray-700 text-lg font-medium">
            Loading brands...
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {brands.map((brand) => (
              <div
                key={brand._id}
                onClick={() => router.push(`/brands/${brand._id}`)}
                className="cursor-pointer rounded-lg border bg-white p-4 flex flex-col items-center justify-center hover:shadow-lg transition-transform transform hover:-translate-y-1"
              >
                <div className="w-24 h-24 relative mb-3">
                  {brand.image ? (
                    <Image
                      src={brand.image}
                      alt={brand.name}
                      fill
                      className="object-contain"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center text-sm text-gray-500">
                      No image
                    </div>
                  )}
                </div>
                <div className="text-center text-sm font-medium">{brand.name}</div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            {loading && brands.length > 0 ? (
              <Button disabled className="px-6 py-2 flex items-center">
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Loading...
              </Button>
            ) : hasMore ? (
              <Button
                onClick={() => fetchBrands(page)}
                className="px-6 py-2"
              >
                Load More
              </Button>
            ) : (
              <div className="text-center text-sm text-gray-600">No more brands</div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
