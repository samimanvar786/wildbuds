'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const CURRENCY_SYMBOL = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL;

interface Props {
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
}

export default function OrderSummary({ subtotal, discount, shipping, tax, total }: Props) {
  const router = useRouter();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  
  const addresses = useSelector((state: RootState) => state.address.items);
  const hasAddress = addresses && addresses.length > 0;
  console.log("Addresses:", addresses);
  console.log("Has Address:", hasAddress);

  const handleCheckout = () => {
    // If not logged in redirect to login with redirect param
    if (!isAuthenticated) {
      router.push('/auth/login?redirect=/checkout');
      return;
    }

    // if (!hasAddress) {
    //   return;
    // }

    // If logged in go to checkout
    router.push('/checkout');
  };

  return (
    <Card className="sticky top-6">
      <CardHeader>
        <CardTitle>Order Summary </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">{CURRENCY_SYMBOL}{subtotal.toFixed(2)}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount</span>
            <span>-{CURRENCY_SYMBOL}{discount.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium">{shipping === 0 ? 'Free' : `${CURRENCY_SYMBOL}${shipping.toFixed(2)}`}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Tax</span>
          <span className="font-medium">{CURRENCY_SYMBOL}{tax.toFixed(2)}</span>
        </div>

        <Separator />

        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span className="text-[#03312f]">{CURRENCY_SYMBOL}{total.toFixed(2)}</span>
        </div>

        <Button
          className="w-full bg-[#03312f] hover:bg-[#024a46] text-white font-semibold py-3"
          onClick={handleCheckout}
          // disabled={!hasAddress}
        >
          Proceed to Checkout
          {/* {hasAddress ? 'Proceed to Checkout' : 'Add Address to Continue'} */}
        </Button>

        <Link href="/products">
          <Button variant="outline" className="w-full">
            Continue Shopping
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
