"use client";

import React, { useRef } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import { createCheckout } from "@/app/actions/checkoutActions";

export default function Checkout({ cartID }: { cartID: string }) {
  const detailsInput = useRef<HTMLInputElement>(null);
  const cityInput = useRef<HTMLInputElement>(null);
  const phoneInput = useRef<HTMLInputElement>(null);

  function getShippingAddress() {
    return {
      details: detailsInput.current?.value || "",
      city: cityInput.current?.value || "",
      phone: phoneInput.current?.value || "",
    };
  }

  async function checkout(method: "online" | "cash") {
    try {
      const data = await createCheckout(cartID, getShippingAddress(), method);
      console.log("Checkout response:", data);

      if (method === "online" && data.status === "success") {
        window.location.href = data.session.url;
      } else if (method === "cash" && data.status === "success") {
        toast.success("Order created successfully");
        window.location.href = "/allorders";
      } else {
        toast.error(data.message || "Checkout failed");
      }
    } catch (err) {
      console.error("❌ Checkout client error:", err);
      toast.error("Something went wrong");
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full bg-black hover:bg-gray-800 text-white">
          Proceed to Checkout
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Shipping Address</DialogTitle>
          <DialogDescription>
            Enter your shipping details to continue checkout.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="details">Details</Label>
            <Input
              ref={detailsInput}
              id="details"
              placeholder="Street, Building, etc."
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="city">City</Label>
            <Input ref={cityInput} id="city" placeholder="e.g. Cairo" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Phone</Label>
            <Input ref={phoneInput} id="phone" placeholder="+20 100 000 0000" />
          </div>
        </div>

        <DialogFooter>
          <div className="flex flex-col w-full gap-2">
            <Button
              onClick={() => checkout("online")}
              type="button"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              Pay Online
            </Button>
            <Button
              onClick={() => checkout("cash")}
              type="button"
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              Pay Cash on Delivery
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
