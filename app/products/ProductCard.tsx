"use client";

import { Heart, ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/useCart";
import { RootState } from "@/store";
import { toggleWishlist } from "@/store/wishlistSlice";
import { Product } from "@/types/product";
import { WishlistItem } from "@/types/wishlist";

const CURRENCY_SYMBOL = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL;
const ROSE_PINK = "#D86A8C";

interface Props {
  product: Product;
  viewMode?: "grid" | "list";
  onRemove?: (id: number) => void;
  onAddToCart?: (id: number) => void;
}

export default function ProductCard({
  product,
  viewMode = "grid",
  onRemove,
  onAddToCart,
}: Props) {
  const dispatch = useDispatch();
  const { handleAddToCart } = useCart();

  const wishlistItems = useSelector(
    (state: RootState) => state.wishlist.items
  );

  const isWishlisted = wishlistItems.some(
    (item) => item.id === product.id
  );

  const handleToggleWishlist = () => {
    const wishlistItem: WishlistItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice ?? null,
      rating: product.rating,
      reviews: product.reviews,
      image: product.featured_image,
      inStock: product.in_stock,
      in_stock: product.in_stock,
      badge: product.badge ?? "",
      slug: product.slug,
      dateAdded: new Date().toISOString(),
    };

    dispatch(toggleWishlist(wishlistItem));
  };

  return (
    <div
      className={`group border rounded-md overflow-hidden transition-all ${
        viewMode === "list"
          ? "flex"
          : "hover:shadow-lg hover:-translate-y-1"
      }`}
    >
      {/* Image */}
      <div
        className={`relative ${
          viewMode === "list" ? "w-48 h-48" : "h-64 w-full"
        }`}
      >
        <Link href={`/products/${product.slug}`}>
          <Image
            src={product.image || product.featured_image}
            alt={product.name}
            fill
            className="object-cover"
          />
        </Link>

        {product.badge && (
          <Badge
            className="absolute top-2 left-2 text-white"
            style={{ backgroundColor: ROSE_PINK }}
          >
            {product.badge}
          </Badge>
        )}

        {/* Wishlist / Remove */}
        <div className="absolute top-2 right-2 flex flex-col gap-1">
          <Button
            size="sm"
            variant="secondary"
            className="h-8 w-8 p-0 rounded-full"
            onClick={handleToggleWishlist}
          >
            <Heart
              className={`h-4 w-4 ${
                isWishlisted
                  ? "fill-pink-500 text-pink-500"
                  : ""
              }`}
            />
          </Button>

          {onRemove && (
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0 rounded-full text-red-500"
              onClick={() => onRemove(product.id)}
            >
              ✕
            </Button>
          )}
        </div>
      </div>

      {/* Content */}
      <div
        className={`p-4 ${
          viewMode === "list"
            ? "flex-1 flex flex-col justify-between"
            : ""
        }`}
      >
        <div>
          <Link href={`/products/${product.slug}`}>
            <h3
              className="font-semibold transition-colors"
              style={{ color: ROSE_PINK }}
            >
              {product.name}
            </h3>
          </Link>

          {/* Rating */}
          <div className="flex gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-4 w-4 ${
                  star <= Math.floor(product.rating || 0)
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-sm text-gray-500">
              ({product.reviews || 0})
            </span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span
            className="font-bold"
            style={{ color: ROSE_PINK }}
          >
            {CURRENCY_SYMBOL}
            {product.price}
          </span>

          {product.originalPrice && (
            <span className="line-through text-sm text-gray-400">
              {CURRENCY_SYMBOL}
              {product.originalPrice}
            </span>
          )}
        </div>

        {/* Button */}
        <Button
          className="mt-2 w-full text-white"
          style={{ backgroundColor: ROSE_PINK }}
          disabled={!product.inStock && !product.in_stock}
          onClick={() =>
            onAddToCart
              ? onAddToCart(product.id)
              : handleAddToCart(product)
          }
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          {product.inStock || product.in_stock
            ? "Add to Cart"
            : "Out of Stock"}
        </Button>
      </div>
    </div>
  );
}
