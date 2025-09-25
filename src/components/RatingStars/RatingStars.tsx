"use client";
import { Star } from "lucide-react";

export default function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex ms-3">
      {Array.from({ length: 5 }).map((_, i) => {
        const starValue = i + 1;
        return (
          <Star
            key={i}
            className={`  ${
              starValue <= Math.floor(rating)
                ? "fill-yellow-400 text-yellow-400"
                : starValue - rating <= 0.5
                ? "fill-yellow-200 text-yellow-200"
                : "text-gray-300"
            }`}
          />
        );
      })}
    </div>
  );
}
