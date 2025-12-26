'use client';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import CartItem from './CartItem';
import { CartItem as CartItemType } from '@/store/cartSlice';

interface Props {
  items: CartItemType[];
}

export default function CartItemList({ items }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cart Items</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item) => (
          <CartItem key={`${item.id}-${item.size || 'default'}`} item={item} />
        ))}
      </CardContent>
    </Card>
  );
}
