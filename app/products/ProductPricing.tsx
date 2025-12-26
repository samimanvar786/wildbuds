interface PricingProps {
  price: number;
  originalPrice?: number;
}

const CURRENCY_SYMBOL = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL;

export function ProductPricing({ price, originalPrice }: PricingProps) {
  return (
    <div className="text-2xl font-semibold text-[#03312f]">
      ${price}
      {originalPrice && (
        <span className="ml-2 text-gray-500 line-through text-lg">
          ${originalPrice}
        </span>
      )}
    </div>
  );
}
