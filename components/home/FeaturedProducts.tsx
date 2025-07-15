'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Heart, ShoppingCart, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState('featured');
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [cart, setCart] = useState<number[]>([]);

  const addToWishlist = (productId: number) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const addToCart = (productId: number) => {
    setCart(prev => [...prev, productId]);
    // You can add toast notification here
  };

  const products = {
    featured: [
      {
        id: 1,
        name: "Monstera Deliciosa",
        price: 299.99,
        originalPrice: 399.99,
        rating: 4.8,
        reviews: 124,
        image: "https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
        badge: "Best Seller",
        isNew: false
      },
      {
        id: 2,
        name: "Snake Plant",
        price: 199.99,
        originalPrice: null,
        rating: 4.6,
        reviews: 89,
        image: "https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
        badge: "Hot",
        isNew: true
      },
      {
        id: 3,
        name: "Fiddle Leaf Fig",
        price: 79.99,
        originalPrice: 99.99,
        rating: 4.9,
        reviews: 56,
        image: "https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
        badge: "Sale",
        isNew: false
      },
      {
        id: 4,
        name: "Peace Lily",
        price: 29.99,
        originalPrice: null,
        rating: 4.7,
        reviews: 203,
        image: "https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
        badge: "Air Purifier",
        isNew: false
      }
    ],
    bestsellers: [
      {
        id: 5,
        name: "Rubber Plant",
        price: 599.99,
        originalPrice: null,
        rating: 4.9,
        reviews: 78,
        image: "https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
        badge: "#1 Seller",
        isNew: false
      },
      {
        id: 6,
        name: "ZZ Plant",
        price: 89.99,
        originalPrice: 120.00,
        rating: 4.8,
        reviews: 145,
        image: "https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
        badge: "Premium",
        isNew: false
      }
    ],
    newest: [
      {
        id: 7,
        name: "Bird of Paradise",
        price: 49.99,
        originalPrice: null,
        rating: 4.5,
        reviews: 23,
        image: "https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
        badge: "Just Arrived",
        isNew: true
      },
      {
        id: 8,
        name: "Pothos Golden",
        price: 24.99,
        originalPrice: null,
        rating: 4.4,
        reviews: 12,
        image: "https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
        badge: "New",
        isNew: true
      }
    ]
  };

  const tabs = [
    { id: 'featured', label: 'Featured' },
    { id: 'bestsellers', label: 'Best Sellers' },
    { id: 'newest', label: 'New Arrivals' }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Plants
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover our handpicked selection of premium plants, each chosen for exceptional 
            beauty, health, and the perfect addition to your space.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-gray-100 rounded-lg p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2 rounded-md font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#03312f] text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products[activeTab as keyof typeof products].map((product) => (
            <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <Link href={`/products/${product.id}`}>
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={400}
                      height={400}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                  
                  {/* Product Badge */}
                  <Badge 
                    className={`absolute top-3 left-3 ${
                      product.badge === 'Sale' ? 'bg-red-500' :
                      product.badge === 'New' || product.badge === 'Just Arrived' ? 'bg-green-500' :
                      product.badge === 'Hot' ? 'bg-orange-500' :
                      'bg-[#03312f]'
                    }`}
                  >
                    {product.badge}
                  </Badge>

                  {/* Quick Actions */}
                  <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button 
                      size="sm" 
                      variant="secondary" 
                      className="h-8 w-8 p-0 rounded-full"
                      onClick={() => addToWishlist(product.id)}
                    >
                      <Heart className={`h-4 w-4 ${wishlist.includes(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
                    </Button>
                    <Link href={`/products/${product.id}`}>
                      <Button size="sm" variant="secondary" className="h-8 w-8 p-0 rounded-full">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>

                  {/* Add to Cart Overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button 
                      className="w-full bg-[#03312f] hover:bg-[#024a46] text-white"
                      onClick={() => addToCart(product.id)}
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                  </div>
                </div>

                <div className="p-4">
                  <Link href={`/products/${product.id}`}>
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#03312f] transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= Math.floor(product.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">({product.reviews})</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-[#03312f]">
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/products">
            <Button 
              variant="outline" 
              size="lg"
              className="border-[#03312f] text-[#03312f] hover:bg-[#03312f] hover:text-white"
            >
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}