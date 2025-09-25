"use client";
import { Button } from '../ui/button';
import { Loader2, ShoppingCart } from 'lucide-react';
import { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { CartContext } from '../Context/cartContext';
import WishlistButton from '../WishlistButton/WishlistButton';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { addToCartServer } from '@/app/(pages)/Products/_actions/addToCartActions';


export default function AddToCart({ productId }: { productId: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const { getCart } = useContext(CartContext);
  const session = useSession();
  const router = useRouter();

  async function handleAddToCart() {
    if (session.status !== 'authenticated') {
      router.push('/login');
      return;
    }

    setIsLoading(true);
    const data = await addToCartServer(productId);
    setIsLoading(false);

    if (data.status === 'success') {
      toast.success(data.message);
      await getCart();
    } else {
      toast.error(data.message);
    }
  }

  return (
    <div className="w-full flex items-center justify-between gap-2 mt-4">
      <Button
        disabled={isLoading}
        onClick={handleAddToCart}
        className="flex-grow flex items-center justify-center gap-2 cursor-pointer"
      >
        {isLoading ? <Loader2 className="animate-spin" /> : <ShoppingCart />} Add To Cart
      </Button>
      <WishlistButton productId={productId} />
    </div>
  );
}
