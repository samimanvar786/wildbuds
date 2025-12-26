'use client';

import ProductCard from './ProductCard';
import { Product } from '@/types/product';

interface Props {
  products: Product[];
  viewMode: 'grid' | 'list';
  wishlist: number[];
  addToWishlist: (id: number) => void;
}

export default function ProductsGrid({ products, viewMode, wishlist, addToWishlist }: Props) {
  return (
    <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6' : 'space-y-4'}>
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          viewMode={viewMode}
          wishlist={wishlist}
          addToWishlist={addToWishlist}
        />
      ))}
    </div>
  );
}
