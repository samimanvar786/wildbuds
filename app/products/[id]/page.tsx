"use client";

import {
  Star,
  Heart,
  ShoppingCart,
  Minus,
  Plus,
  Truck,
  Shield,
  RotateCcw,
  MessageCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import ProductImageGallery from "@/app/products/ProductImageGallery";
import { ProductPricing } from "@/app/products/ProductPricing";
import { ProductSizeSelector } from "@/app/products/ProductSizeSelector";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/hooks/useCart";
import { fetchProductById } from "@/lib/api/products";
import { Product } from "@/types/product";

const CURRENCY_SYMBOL = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL;

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("Medium");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);

  const { handleAddToCart } = useCart();

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const prod = await fetchProductById(params.id);
        setProduct(prod);
      } catch (err) {
        console.error("Failed to fetch product:", err);
      }
    };
    loadProduct();
  }, [params.id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading product details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <ProductImageGallery images={product.images} />

          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

            {/* <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={`h-5 w-5 ${
                    s <= Math.floor(product.rating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
              <span className="text-sm text-gray-600">
                ({product.reviews} reviews)
              </span>
            </div> */}

            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-5 w-5 ${
                        star <= Math.floor(product.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  ({product.reviews} reviews)
                </span>
              </div>

              {product.inStock ? (
                <Badge
                  variant="outline"
                  className="text-green-600 border-green-600"
                >
                  In Stock ({product.in_stock} left)
                </Badge>
              ) : (
                <Badge
                  variant="outline"
                  className="text-red-600 border-red-600"
                >
                  Out of Stock
                </Badge>
              )}
            </div>

            {/* <ProductPricing
              price={product.price}
              originalPrice={product.originalPrice}
            /> */}
            <div className="flex items-center gap-4 mb-6">
              {Number(product.sale_price) > 0 ? (
                <>
                  <span className="text-3xl font-bold text-[#03312f]">
                    {CURRENCY_SYMBOL}{Number(product.sale_price).toFixed(2)}
                  </span>

                  {product.price && (
                    <span className="text-xl text-gray-500 line-through">
                      {CURRENCY_SYMBOL}{Number(product.price).toFixed(2)}
                    </span>
                  )}

                  {product.price && (
                    <Badge className="bg-red-100 text-red-800">
                      Save {CURRENCY_SYMBOL}
                      {(
                        Number(product.price) - Number(product.sale_price)
                      ).toFixed(2)}
                    </Badge>
                  )}
                </>
              ) : (
                <span className="text-3xl font-bold text-[#03312f]">
                  {CURRENCY_SYMBOL}{Number(product.price).toFixed(2)}
                </span>
              )}
            </div>

            <p className="text-gray-600">{product.description}</p>

            <ProductSizeSelector
              sizes={product.sizes}
              weight={product.weight}
              selectedSize={selectedSize}
              onSelect={setSelectedSize}
            />

            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Minus />
              </Button>
              <span>{quantity}</span>
              <Button variant="ghost" onClick={() => setQuantity(quantity + 1)}>
                <Plus />
              </Button>
            </div>

            <div className="flex gap-4">
              <Button
                size="lg"
                className="flex-1 bg-[#03312f] hover:bg-[#024a46] text-white"
                onClick={() => handleAddToCart(product, quantity, selectedSize)}
              >
                <ShoppingCart className="mr-2" /> Add to Cart
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={
                  isWishlisted ? "bg-[#03312f] text-white" : "text-[#03312f]"
                }
              >
                <Heart className={isWishlisted ? "fill-current" : ""} />
              </Button>
            </div>

            {/* Features */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Key Features</h3>
              <ul className="space-y-2">{product.features}</ul>
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t">
              <div className="text-center">
                <Truck className="h-6 w-6 text-[#03312f] mx-auto mb-2" />
                <p className="text-sm font-medium">Free Delivery</p>
                <p className="text-xs text-gray-600">Orders over {CURRENCY_SYMBOL}75</p>
              </div>
              <div className="text-center">
                <Shield className="h-6 w-6 text-[#03312f] mx-auto mb-2" />
                <p className="text-sm font-medium">Plant Guarantee</p>
                <p className="text-xs text-gray-600">30-day healthy</p>
              </div>
              <div className="text-center">
                <RotateCcw className="h-6 w-6 text-[#03312f] mx-auto mb-2" />
                <p className="text-sm font-medium">Easy Returns</p>
                <p className="text-xs text-gray-600">Hassle-free</p>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="description">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="care">Care</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="description">
            <Card className="mt-4">
              <CardContent className="p-6 text-gray-600">
                {product.description}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="care">
            <Card className="mt-4">
              <CardContent className="p-6 text-gray-600">
                {product?.careInstructions &&
                Object.keys(product.careInstructions).length > 0 ? (
                  <ul>
                    {Object.entries(product.careInstructions).map(
                      ([key, val]) => (
                        <li key={key} className="mb-2">
                          <strong>{key}:</strong> {val}
                        </li>
                      )
                    )}
                  </ul>
                ) : (
                  <p>No care instructions available.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews">
            <Card className="mt-4">
              <CardContent className="p-6 text-gray-600">
                <p>No reviews available.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
}
