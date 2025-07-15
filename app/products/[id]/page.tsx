"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";

export default function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("Medium");
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Mock product data - in real app, fetch based on params.id
  const product = {
    id: parseInt(params.id),
    name: "Monstera Deliciosa",
    price: 299.99,
    originalPrice: 399.99,
    rating: 4.8,
    reviews: 124,
    inStock: true,
    stockCount: 15,
    badge: "Best Seller",
    images: [
      "https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop",
      "https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop",
      "https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop",
      "https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop",
    ],
    sizes: ["Small", "Medium", "Large"],
    description:
      "The Monstera Deliciosa, also known as the Swiss Cheese Plant, is a stunning tropical houseplant known for its large, glossy leaves with distinctive splits and holes. This low-maintenance beauty is perfect for adding a touch of jungle vibes to any indoor space.",
    features: [
      "Air-purifying qualities",
      "Low maintenance care",
      "Fast-growing vine",
      "Unique fenestrated leaves",
      "Pet-friendly (with caution)",
    ],
    careInstructions: {
      light: "Bright, indirect light",
      water: "Water when top inch of soil is dry",
      humidity: "50-60% humidity preferred",
      temperature: "65-80°F (18-27°C)",
      fertilizer: "Monthly during growing season",
    },
  };

  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      date: "2024-01-15",
      comment:
        "Absolutely love this plant! It arrived in perfect condition and has been thriving in my living room. The leaves are gorgeous and it's growing so fast!",
      verified: true,
    },
    {
      id: 2,
      name: "Mike Chen",
      rating: 4,
      date: "2024-01-10",
      comment:
        "Beautiful plant, well-packaged. Only giving 4 stars because it took a few days to adjust to my home, but now it's doing great!",
      verified: true,
    },
    {
      id: 3,
      name: "Emma Davis",
      rating: 5,
      date: "2024-01-08",
      comment:
        "This is my third plant from Wild Buds and they never disappoint. Healthy, beautiful plants every time!",
      verified: true,
    },
  ];

  const relatedProducts = [
    {
      id: 2,
      name: "Snake Plant",
      price: 199.99,
      image:
        "https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
      rating: 4.6,
    },
    {
      id: 3,
      name: "Fiddle Leaf Fig",
      price: 79.99,
      image:
        "https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
      rating: 4.9,
    },
    {
      id: 4,
      name: "Peace Lily",
      price: 29.99,
      image:
        "https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
      rating: 4.7,
    },
  ];

  const addToCart = () => {
    // Add to cart logic
    console.log("Added to cart:", {
      productId: product.id,
      quantity,
      size: selectedSize,
    });
    // You can add toast notification here
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-[#03312f]">
            Home
          </Link>
          <span>/</span>
          <Link href="/products" className="hover:text-[#03312f]">
            Products
          </Link>
          <span>/</span>
          <Link href="/categories/1" className="hover:text-[#03312f]">
            Indoor Plants
          </Link>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
              />
              {product.badge && (
                <Badge className="absolute top-4 left-4 bg-[#03312f]">
                  {product.badge}
                </Badge>
              )}
            </div>

            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-colors ${
                    selectedImage === index
                      ? "border-[#03312f]"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>

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
                    In Stock ({product.stockCount} left)
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

              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-[#03312f]">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">
                    ${product.originalPrice}
                  </span>
                )}
                {product.originalPrice && (
                  <Badge className="bg-red-100 text-red-800">
                    Save ${(product.originalPrice - product.price).toFixed(2)}
                  </Badge>
                )}
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>

            {/* Size Selection */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Size</h3>
              <div className="flex gap-2">
                {product.sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "default" : "outline"}
                    onClick={() => setSelectedSize(size)}
                    className={
                      selectedSize === size
                        ? "bg-[#03312f] hover:bg-[#024a46]"
                        : ""
                    }
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Quantity</h3>
                <div className="flex items-center border rounded-md w-fit">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-10 w-10 p-0"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4 py-2 min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                    className="h-10 w-10 p-0"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  size="lg"
                  className="flex-1 bg-[#03312f] hover:bg-[#024a46] text-white"
                  disabled={!product.inStock}
                  onClick={addToCart}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`border-[#03312f] ${
                    isWishlisted
                      ? "bg-[#03312f] text-white"
                      : "text-[#03312f] hover:bg-[#03312f] hover:text-white"
                  }`}
                >
                  <Heart
                    className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`}
                  />
                </Button>
              </div>
            </div>

            {/* Features */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 text-gray-600"
                  >
                    <div className="w-1.5 h-1.5 bg-[#03312f] rounded-full"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t">
              <div className="text-center">
                <Truck className="h-6 w-6 text-[#03312f] mx-auto mb-2" />
                <p className="text-sm font-medium">Free Delivery</p>
                <p className="text-xs text-gray-600">Orders over $75</p>
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

        {/* Product Details Tabs */}
        <Tabs defaultValue="description" className="mb-16">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="care">Care Instructions</TabsTrigger>
            <TabsTrigger value="reviews">
              Reviews ({product.reviews})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <p className="text-gray-600 leading-relaxed mb-4">
                  {product.description}
                </p>
                <h4 className="font-semibold text-gray-900 mb-3">
                  What makes this plant special:
                </h4>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-2 text-gray-600"
                    >
                      <div className="w-1.5 h-1.5 bg-[#03312f] rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="care" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Light Requirements
                    </h4>
                    <p className="text-gray-600 mb-4">
                      {product.careInstructions.light}
                    </p>

                    <h4 className="font-semibold text-gray-900 mb-3">
                      Watering
                    </h4>
                    <p className="text-gray-600 mb-4">
                      {product.careInstructions.water}
                    </p>

                    <h4 className="font-semibold text-gray-900 mb-3">
                      Fertilizing
                    </h4>
                    <p className="text-gray-600">
                      {product.careInstructions.fertilizer}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Humidity
                    </h4>
                    <p className="text-gray-600 mb-4">
                      {product.careInstructions.humidity}
                    </p>

                    <h4 className="font-semibold text-gray-900 mb-3">
                      Temperature
                    </h4>
                    <p className="text-gray-600 mb-4">
                      {product.careInstructions.temperature}
                    </p>

                    <div className="bg-green-50 p-4 rounded-lg">
                      <h5 className="font-medium text-green-800 mb-2">
                        💡 Pro Tip
                      </h5>
                      <p className="text-green-700 text-sm">
                        Mist the leaves regularly to increase humidity and keep
                        them dust-free for optimal photosynthesis.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <div className="space-y-6">
              {/* Review Summary */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-6 mb-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-[#03312f] mb-1">
                        {product.rating}
                      </div>
                      <div className="flex justify-center mb-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${
                              star <= Math.floor(product.rating)
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <div className="text-sm text-gray-600">
                        {product.reviews} reviews
                      </div>
                    </div>
                    <div className="flex-1">
                      <Button className="bg-[#03312f] hover:bg-[#024a46]">
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Write a Review
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Individual Reviews */}
              <div className="space-y-4">
                {reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-gray-900">
                              {review.name}
                            </span>
                            {review.verified && (
                              <Badge variant="outline" className="text-xs">
                                Verified Purchase
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`h-4 w-4 ${
                                    star <= review.rating
                                      ? "text-yellow-400 fill-current"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-600">
                              {review.date}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600">{review.comment}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Card
                key={relatedProduct.id}
                className="group hover:shadow-lg transition-all duration-300"
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <Link href={`/products/${relatedProduct.id}`}>
                      <Image
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        width={300}
                        height={300}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </Link>
                  </div>
                  <div className="p-4">
                    <Link href={`/products/${relatedProduct.id}`}>
                      <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-[#03312f] transition-colors">
                        {relatedProduct.name}
                      </h3>
                    </Link>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-[#03312f]">
                        ${relatedProduct.price}
                      </span>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${
                              star <= Math.floor(relatedProduct.rating)
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
