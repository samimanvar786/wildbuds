'use client';

import Image from "next/image";
import { useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "@/store/cartSlice";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2 } from "lucide-react";
const CURRENCY_SYMBOL = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL;

interface Props {
  item: {
    id: string;
    name: string;
    image: string;
    size?: string;
    price: number;
    quantity: number;
  };
  isLast?: boolean;
}

export default function CartItem({ item, isLast }: Props) {
  const dispatch = useDispatch();

  const handleQuantityChange = (change: number) => {
    const newQuantity = Math.max(1, item.quantity + change);
    dispatch(updateQuantity({ id: item.id, quantity: newQuantity }));
  };

  const handleRemove = () => {
    dispatch(removeFromCart(item.id));
  };

  return (
    <div>
      <div className="flex gap-4">
        {/* Product Image */}
        <div className="w-24 h-24 relative rounded-lg overflow-hidden bg-gray-100">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1">
          {/* Title + Remove Button */}
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-semibold text-gray-900">{item.name}</h3>
              {item.size && (
                <p className="text-sm text-gray-600">Size: {item.size}</p>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRemove}
              className="text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          {/* Quantity Controls + Price */}
          <div className="flex justify-between items-center">
            <div className="flex items-center border rounded-md">
              <Button
                variant="ghost"
                size="sm"
                disabled={item.quantity <= 1}
                onClick={() => handleQuantityChange(-1)}
                className="h-8 w-8 p-0"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="px-3 py-1 min-w-[3rem] text-center">
                {item.quantity}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleQuantityChange(1)}
                className="h-8 w-8 p-0"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="text-right">
              <p className="font-semibold text-[#03312f]">
                {CURRENCY_SYMBOL}{(item.price * item.quantity).toFixed(2)}
              </p>
              <p className="text-sm text-gray-500">
                {CURRENCY_SYMBOL}{item.price.toFixed(2)} each
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Separator if not last item */}
      {!isLast && <Separator className="mt-6" />}
    </div>
  );
}
