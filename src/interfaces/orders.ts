import { ProductI } from "./product";

export interface CartItemI {
  _id: string;
  product: ProductI;
  price: number;
  count: number;
}

export interface OrderI {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
    phone?: string;
  };
  cartItems: CartItemI[];
  shippingAddress: {
    details?: string;
    city: string;
    phone?: string;
  };
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  paidAt?: string;
  totalOrderPrice: number;
  taxPrice: number;
  shippingPrice: number;
  createdAt: string;
  updatedAt: string;
}
