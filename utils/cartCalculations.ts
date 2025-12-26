import { CartItem } from '@/types/cart';

export function calculateSubtotal(items: CartItem[]) {
  return items.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);
}

export function calculateDiscount(subtotal: number, discountRate: number) {
  return subtotal * discountRate;
}

export function calculateShipping(subtotal: number) {
  return subtotal > 50 ? 0 : 9.99;
}

export function calculateTax(amount: number) {
  return amount * 0.08;
}

export function calculateTotal(subtotal: number, discount: number, shipping: number, tax: number) {
  return subtotal - discount + shipping + tax;
}
