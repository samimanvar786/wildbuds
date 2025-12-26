import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function EmptyCart() {
  return (
    <div className="text-center max-w-md mx-auto py-16">
      <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-6" />
      <h1 className="text-2xl font-bold">Your cart is empty</h1>
      <p className="text-gray-600 mb-8">Looks like you haven't added any items yet.</p>
      <Link href="/products">
        <Button className="bg-[#03312f] hover:bg-[#024a46]">Continue Shopping</Button>
      </Link>
    </div>
  );
}
