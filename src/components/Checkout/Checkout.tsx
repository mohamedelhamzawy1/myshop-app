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
import toast, { Toaster } from "react-hot-toast";

export default function Checkout({ cartId }: { cartId: string }) {
  const detailsInput = useRef<HTMLInputElement>(null);
  const cityInput = useRef<HTMLInputElement>(null);
  const phoneInput = useRef<HTMLInputElement>(null);

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YjZlMzFlY2E0NWFiOWY5MWEwZWNlMCIsIm5hbWUiOiJBZGFtIE1vaGFtZWQiLCJyb2xlIjoidXNlciIsImlhdCI6MTc1ODM5NzA4NCwiZXhwIjoxNzY2MTczMDg0fQ.AI64KFTTJ5PsnP4gL1ynKlR81IwFQqyHTO7JTO4UHuA";

  function getShippingAddress() {
    return {
      details: detailsInput.current?.value,
      city: cityInput.current?.value,
      phone: phoneInput.current?.value,
    };
  }

  async function checkoutOnline() {
    const shippingAddress = getShippingAddress();

    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
      {
        method: "POST",
        body: JSON.stringify({ shippingAddress }),
        headers: {
          token,
          "content-type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log("Online Payment Response:", data);

    if (data.status === "success") {
      window.location.href = data.session.url; 
    }
  }

  async function checkoutCash() {
    const shippingAddress = getShippingAddress();

    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
      {
        method: "POST",
        body: JSON.stringify({ shippingAddress }),
        headers: {
          token,
          "content-type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log("Cash Payment Response:", data);

    if (data.status === "success") {
      toast.success("Order created successfuly");
       window.location.href = "/allorders"; 
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
      onClick={checkoutOnline}
      type="button"
      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
    >
      Pay Online
    </Button>
    <Button
      onClick={checkoutCash}
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
