'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import EmptyCart from '@/app/cart/EmptyCart';
import CartItemList from '@/app/cart/CartItemList';
import CouponForm from '@/app/cart/CouponForm';
import OrderSummary from '@/app/cart/OrderSummary';
import {
  calculateSubtotal,
  calculateDiscount,
  calculateShipping,
  calculateTax,
  calculateTotal,
} from '@/utils/cartCalculations';

export default function CartPage() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);

  const subtotal = calculateSubtotal(cartItems);
  const discountAmount = appliedCoupon ? calculateDiscount(subtotal, appliedCoupon.discount) : 0;
  const shipping = calculateShipping(subtotal);
  const tax = calculateTax(subtotal - discountAmount);
  const total = calculateTotal(subtotal, discountAmount, shipping, tax);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <EmptyCart />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <CartItemList items={cartItems} />
          <CouponForm
            onApply={(code, discount) => setAppliedCoupon({ code, discount })}
            appliedCoupon={appliedCoupon}
            discountAmount={discountAmount}
          />
        </div>
        <OrderSummary
          subtotal={subtotal}
          discount={discountAmount}
          shipping={shipping}
          tax={tax}
          total={total}
        />
      </div>
      <Footer />
    </div>
  );
}
