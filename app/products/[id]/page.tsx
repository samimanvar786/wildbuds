"use client";

import { useEffect, useState } from "react";
import {
  Star,
  Heart,
  ShoppingCart,
  Minus,
  Plus,
  Truck,
  Shield,
  RotateCcw,
} from "lucide-react";

import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import ProductImageGallery from "@/app/products/ProductImageGallery";
import { ProductSizeSelector } from "@/app/products/ProductSizeSelector";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useCart } from "@/hooks/useCart";
import { fetchProductById } from "@/lib/api/products";
import { Product } from "@/types/product";

const CURRENCY_SYMBOL = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL;
const ROSE_PINK = "#D86A8C";

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
      } catch (error) {
        console.error("Failed to fetch product:", error);
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
          {/* Images */}
          <ProductImageGallery
            images={product.images}
            selectedImage={selectedImage}
            onSelect={setSelectedImage}
          />

          {/* Info */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">{product.name}</h1>

            {/* Rating & Stock */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
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
                <span className="text-sm text-gray-600">
                  ({product.reviews} reviews)
                </span>
              </div>

              {product.inStock ? (
                <Badge variant="outline" className="text-green-600 border-green-600">
                  In Stock ({product.in_stock} left)
                </Badge>
              ) : (
                <Badge variant="outline" className="text-red-600 border-red-600">
                  Out of Stock
                </Badge>
              )}
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              {Number(product.sale_price) > 0 ? (
                <>
                  <span
                    className="text-3xl font-bold"
                    style={{ color: ROSE_PINK }}
                  >
                    {CURRENCY_SYMBOL}
                    {Number(product.sale_price).toFixed(2)}
                  </span>

                  <span className="text-xl text-gray-500 line-through">
                    {CURRENCY_SYMBOL}
                    {Number(product.price).toFixed(2)}
                  </span>

                  <Badge className="bg-red-100 text-red-800">
                    Save {CURRENCY_SYMBOL}
                    {(
                      Number(product.price) - Number(product.sale_price)
                    ).toFixed(2)}
                  </Badge>
                </>
              ) : (
                <span
                  className="text-3xl font-bold"
                  style={{ color: ROSE_PINK }}
                >
                  {CURRENCY_SYMBOL}
                  {Number(product.price).toFixed(2)}
                </span>
              )}
            </div>

            <p className="text-gray-600">{product.description}</p>

            {/* Size */}
            <ProductSizeSelector
              sizes={product.sizes}
              weight={product.weight}
              selectedSize={selectedSize}
              onSelect={setSelectedSize}
            />

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                <Minus />
              </Button>
              <span>{quantity}</span>
              <Button variant="ghost" onClick={() => setQuantity(quantity + 1)}>
                <Plus />
              </Button>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <Button
                size="lg"
                className="flex-1 text-white"
                style={{ backgroundColor: ROSE_PINK }}
                onClick={() =>
                  handleAddToCart(product, quantity, selectedSize)
                }
              >
                <ShoppingCart className="mr-2" />
                Add to Cart
              </Button>

              <Button
                variant="outline"
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={
                  isWishlisted
                    ? "text-white"
                    : ""
                }
                style={
                  isWishlisted
                    ? { backgroundColor: ROSE_PINK }
                    : { color: ROSE_PINK, borderColor: ROSE_PINK }
                }
              >
                <Heart className={isWishlisted ? "fill-current" : ""} />
              </Button>
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t">
              {[
                { icon: Truck, title: "Free Delivery", sub: "Orders over $75" },
                { icon: Shield, title: "Plant Guarantee", sub: "30-day healthy" },
                { icon: RotateCcw, title: "Easy Returns", sub: "Hassle-free" },
              ].map(({ icon: Icon, title, sub }) => (
                <div key={title} className="text-center">
                  <Icon className="h-6 w-6 mx-auto mb-2" style={{ color: ROSE_PINK }} />
                  <p className="text-sm font-medium">{title}</p>
                  <p className="text-xs text-gray-600">{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
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
                {product.careInstructions ? (
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
