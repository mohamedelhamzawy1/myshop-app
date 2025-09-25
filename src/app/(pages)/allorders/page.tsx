"use client";

import React, { useEffect, useState } from "react";
import { OrderI } from "@/interfaces/orders";
import { Loader2 } from "lucide-react";

export default function AllOrders() {
  const [orders, setOrders] = useState<OrderI[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      setError("No user found");
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`);
        if (!res.ok) throw new Error("Failed to fetch orders");
        const data: OrderI[] = await res.json();
        setOrders(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-600 py-10">{error}</div>
    );

  if (orders.length === 0)
    return (
      <div className="text-center text-gray-600 py-10">No orders found.</div>
    );

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Your Orders</h1>
      <div className="flex flex-col gap-8">
        {orders.map((order) => (
          <div
            key={order._id}
            className="border rounded-xl p-6 bg-white shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
              <p className="text-sm text-gray-500">
                Ordered on:{" "}
                <span className="font-medium text-gray-700">
                  {new Date(order.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </p>
              <p className="text-sm">
                Paid: <span className={`font-medium ${order.isPaid ? "text-green-600" : "text-red-600"}`}>{order.isPaid ? "Yes" : "No"}</span>{" "}
                | Delivered: <span className={`font-medium ${order.isDelivered ? "text-green-600" : "text-red-600"}`}>{order.isDelivered ? "Yes" : "No"}</span>
              </p>
            </div>

            <div className="mb-4 flex flex-wrap justify-between items-center gap-4 text-sm text-gray-600">
              <p>Payment Method: <span className="font-medium text-gray-800">{order.paymentMethodType}</span></p>
              <p>Total Price: <span className="font-bold text-gray-800">{order.totalOrderPrice} EGP</span></p>
              <p>Shipping City: <span className="font-medium text-gray-800">{order.shippingAddress.city}</span></p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-fr">
              {order.cartItems.map((item) => (
                <div
                  key={item._id}
                  className="border rounded-lg p-4 flex flex-col items-center bg-gray-50 hover:bg-white transition-colors duration-300 shadow-sm hover:shadow-md"
                >
                  <img
                    src={item.product.imageCover}
                    alt={item.product.title}
                    className="w-36 h-36 object-cover mb-3 rounded-lg"
                  />
                  <h3 className="text-sm font-semibold text-center truncate w-full">{item.product.title}</h3>
                  <p className="text-xs text-gray-500 mt-1">{item.product.brand?.name}</p>
                  <p className="text-sm font-bold mt-2">{item.price} EGP</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
