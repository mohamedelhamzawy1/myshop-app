"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CategoryI } from "@/interfaces/category"; 
import { Loader2 } from "lucide-react";

export default function CategoriesPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<CategoryI[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  async function getCategories() {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("https://ecommerce.routemisr.com/api/v1/categories");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      setCategories(json.data || []);
    } catch (e) {
      console.error("getCategories error:", e);
      setError("Failed to load categories.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh]">
             <Loader2 className="animate-spin text-blue-500 mb-4" size={48} />
             <p className="text-gray-700 text-lg font-semibold">
               Loading all categories...
             </p>
           </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">All Categories</h1>

      {error && <div className="text-center text-red-600 mb-6">{error}</div>}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <div
            key={cat._id}
            onClick={() => router.push(`/categories/${cat._id}`)}
            className="cursor-pointer border rounded-lg p-4 bg-white flex flex-col items-center hover:shadow-md transition transform hover:-translate-y-1"
          >
            {cat.image ? (
              <img src={cat.image} alt={cat.name} className="w-24 h-24 object-contain mb-2" />
            ) : (
              <div className="w-24 h-24 bg-gray-100 flex items-center justify-center mb-2 text-sm text-gray-500">
                No image
              </div>
            )}
            <h2 className="text-lg font-semibold text-center">{cat.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
