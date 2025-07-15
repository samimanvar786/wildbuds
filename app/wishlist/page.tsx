'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart, Trash2, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: "Monstera Deliciosa",
      price: 299.99,
      originalPrice: 399.99,
      rating: 4.8,
      reviews: 124,
      image: "https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
      inStock: true,
      badge: "Best Seller",
      dateAdded: "2024-01-15"
    },
    {
      id: 2,
      name: "Snake Plant",
      price: 199.99,
      originalPrice: null,
      rating: 4.6,
      reviews: 89,
      image: "https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
      inStock: true,
      badge: "New",
      dateAdded: "2024-01-12"
    },
    {
      id: 3,
      name: "Fiddle Leaf Fig",
      price: 79.99,
      originalPrice: 99.99,
      rating: 4.9,
      reviews: 56,
      image: "https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
      inStock: true,
      badge: "Sale",
      dateAdded: "2024-01-10"
    },
    {
      id: 4,
      name: "Peace Lily",
      price: 29.99,
      originalPrice: null,
      rating: 4.7,
      reviews: 203,
      image: "https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
      inStock: false,
      badge: "Air Purifier",
      dateAdded: "2024-01-08"
    },
    {
      id: 5,
      name: "Rubber Plant",
      price: 159.99,
      originalPrice: null,
      rating: 4.5,
      reviews: 78,
      image: "https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
      inStock: true,
      badge: "Premium",
      dateAdded: "2024-01-05"
    }
  ]);

  const removeFromWishlist = (id: number) => {
    setWishlistItems(items => items.filter(item => item.id !== id));
  };

  const addToCart = (id: number) => {
    // Add to cart logic here
    console.log(`Added item ${id} to cart`);
  };

  const addAllToCart = () => {
    const inStockItems = wishlistItems.filter(item => item.inStock);
    inStockItems.forEach(item => addToCart(item.id));
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-md mx-auto">
            <Heart className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Your wishlist is empty</h1>
            <p className="text-gray-600 mb-8">
              Save your favorite plants to your wishlist and never lose track of them.
            </p>
            <Link href="/products">
              <Button className="bg-[#03312f] hover:bg-[#024a46]">
                Discover Plants
              </Button>
            
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
            <p className="text-gray-600">{wishlistItems.length} items saved</p>
          </div>
          
          <div className="flex gap-4">
            <Button 
              variant="outline"
              onClick={addAllToCart}
              disabled={!wishlistItems.some(item => item.inStock)}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add All to Cart
            </Button>
          </div>
        </div>

        {/* Wishlist Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <Card key={item.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <Link href={`/products/${item.id}`}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={300}
                      height={300}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                  
                  {/* Product Badge */}
                  <Badge 
                    className={`absolute top-3 left-3 ${
                      item.badge === 'Sale' ? 'bg-red-500' :
                      item.badge === 'New' ? 'bg-green-500' :
                      item.badge === 'Best Seller' ? 'bg-orange-500' :
                      'bg-[#03312f]'
                    }`}
                  >
                    {item.badge}
                  </Badge>

                  {/* Remove from Wishlist */}
                  <Button
                    size="sm"
                    variant="secondary"
                    className="absolute top-3 right-3 h-8 w-8 p-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeFromWishlist(item.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>

                  {!item.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="text-white font-semibold">Out of Stock</span>
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <Link href={`/products/${item.id}`}>
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#03312f] transition-colors">
                      {item.name}
                    </h3>
                  </Link>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= Math.floor(item.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">({item.reviews})</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-lg font-bold text-[#03312f]">
                      ${item.price}
                    </span>
                    {item.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        ${item.originalPrice}
                      </span>
                    )}
                  </div>

                  {/* Date Added */}
                  <p className="text-xs text-gray-500 mb-4">
                    Added on {new Date(item.dateAdded).toLocaleDateString()}
                  </p>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button 
                      className="flex-1 bg-[#03312f] hover:bg-[#024a46] text-white"
                      disabled={!item.inStock}
                      onClick={() => addToCart(item.id)}
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeFromWishlist(item.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Heart className="h-4 w-4 fill-current" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recommendations */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Add recommended products here */}
            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <Image
                    src="https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop"
                    alt="ZZ Plant"
                    width={300}
                    height={300}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-3 left-3 bg-green-500">
                    Recommended
                  </Badge>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">ZZ Plant</h3>
                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">(89)</span>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-lg font-bold text-[#03312f]">$89.99</span>
                  </div>
                  <Button className="w-full bg-[#03312f] hover:bg-[#024a46] text-white">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}