'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Filter, Grid, List, ChevronDown, Star, Heart, ShoppingCart, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';

export default function CategoryPage({ params }: { params: { id: string } }) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [wishlist, setWishlist] = useState<number[]>([]);

  const itemsPerPage = 12;

  // Mock category data - in real app, fetch based on params.id
  const category = {
    id: 1,
    name: "Indoor Plants",
    description: "Transform your living space with our carefully selected indoor plants",
    image: "https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&fit=crop"
  };

  const products = [
    {
      id: 1,
      name: "Monstera Deliciosa",
      price: 299.99,
      originalPrice: 399.99,
      rating: 4.8,
      reviews: 124,
      image: "https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
      brand: "PlantPro",
      inStock: true,
      badge: "Best Seller",
      features: ["Air Purifying", "Low Light"]
    },
    {
      id: 2,
      name: "Snake Plant",
      price: 199.99,
      originalPrice: null,
      rating: 4.6,
      reviews: 89,
      image: "https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
      brand: "GreenThumb",
      inStock: true,
      badge: "New",
      features: ["Air Purifying", "Low Maintenance"]
    },
    {
      id: 3,
      name: "Fiddle Leaf Fig",
      price: 79.99,
      originalPrice: 99.99,
      rating: 4.9,
      reviews: 56,
      image: "https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
      brand: "PlantPro",
      inStock: true,
      badge: "Sale",
      features: ["Bright Light", "Statement Plant"]
    },
    {
      id: 4,
      name: "Peace Lily",
      price: 29.99,
      originalPrice: null,
      rating: 4.7,
      reviews: 203,
      image: "https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
      brand: "EcoPlants",
      inStock: true,
      badge: "Air Purifier",
      features: ["Air Purifying", "Flowering"]
    },
    {
      id: 5,
      name: "Rubber Plant",
      price: 159.99,
      originalPrice: null,
      rating: 4.5,
      reviews: 78,
      image: "https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
      brand: "GreenThumb",
      inStock: false,
      badge: "Premium",
      features: ["Low Light", "Large Leaves"]
    },
    {
      id: 6,
      name: "ZZ Plant",
      price: 89.99,
      originalPrice: 120.00,
      rating: 4.8,
      reviews: 145,
      image: "https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
      brand: "PlantPro",
      inStock: true,
      badge: "Sale",
      features: ["Low Light", "Low Maintenance"]
    }
  ];

  const brands = ["PlantPro", "GreenThumb", "EcoPlants", "BotanicCo"];
  const features = ["Air Purifying", "Low Light", "Low Maintenance", "Pet Safe", "Flowering", "Large Leaves"];

  // Filter products based on selected filters
  const filteredProducts = products.filter(product => {
    const priceInRange = product.price >= priceRange[0] && product.price <= priceRange[1];
    const brandMatch = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
    const featureMatch = selectedFeatures.length === 0 || selectedFeatures.some(feature => product.features.includes(feature));
    
    return priceInRange && brandMatch && featureMatch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const addToWishlist = (productId: number) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const FilterSidebar = () => (
    <div className="space-y-6">
      {/* Price Range */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Price Range</h3>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          max={500}
          step={10}
          className="mb-2"
        />
        <div className="flex justify-between text-sm text-gray-600">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      {/* Brands */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Brands</h3>
        <div className="space-y-2">
          {brands.map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox
                id={brand}
                checked={selectedBrands.includes(brand)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedBrands([...selectedBrands, brand]);
                  } else {
                    setSelectedBrands(selectedBrands.filter(b => b !== brand));
                  }
                }}
              />
              <label htmlFor={brand} className="text-sm text-gray-700 cursor-pointer">
                {brand}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Features</h3>
        <div className="space-y-2">
          {features.map((feature) => (
            <div key={feature} className="flex items-center space-x-2">
              <Checkbox
                id={feature}
                checked={selectedFeatures.includes(feature)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedFeatures([...selectedFeatures, feature]);
                  } else {
                    setSelectedFeatures(selectedFeatures.filter(f => f !== feature));
                  }
                }}
              />
              <label htmlFor={feature} className="text-sm text-gray-700 cursor-pointer">
                {feature}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-[#03312f]">Home</Link>
          <span>/</span>
          <Link href="/categories" className="hover:text-[#03312f]">Categories</Link>
          <span>/</span>
          <span className="text-gray-900">{category.name}</span>
        </nav>

        {/* Category Header */}
        <div className="relative h-48 rounded-lg overflow-hidden mb-8">
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center">
            <div className="container mx-auto px-4">
              <div className="text-white">
                <h1 className="text-4xl font-bold mb-2">{category.name}</h1>
                <p className="text-lg opacity-90">{category.description}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <Card>
              <CardContent className="p-6">
                <h2 className="font-semibold text-gray-900 mb-4">Filters</h2>
                <FilterSidebar />
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex items-center gap-4">
                {/* Mobile Filter */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden">
                      <Filter className="h-4 w-4 mr-2" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                      <SheetDescription>
                        Refine your plant search
                      </SheetDescription>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterSidebar />
                    </div>
                  </SheetContent>
                </Sheet>

                <span className="text-sm text-gray-600">
                  Showing {paginatedProducts.length} of {filteredProducts.length} products
                </span>
              </div>

              <div className="flex items-center gap-4">
                {/* Sort */}
                <Select defaultValue="featured">
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Customer Rating</SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                  </SelectContent>
                </Select>

                {/* View Mode */}
                <div className="flex border rounded-md">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded-r-none"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className={viewMode === 'grid' 
              ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-8" 
              : "space-y-4 mb-8"
            }>
              {paginatedProducts.map((product) => (
                <Card 
                  key={product.id} 
                  className={`group hover:shadow-lg transition-all duration-300 ${
                    viewMode === 'list' ? 'flex' : 'hover:-translate-y-1'
                  }`}
                >
                  <CardContent className={`p-0 ${viewMode === 'list' ? 'flex w-full' : ''}`}>
                    <div className={`relative overflow-hidden ${
                      viewMode === 'list' ? 'w-48 flex-shrink-0' : ''
                    }`}>
                      <Link href={`/products/${product.id}`}>
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={400}
                          height={400}
                          className={`object-cover group-hover:scale-105 transition-transform duration-300 ${
                            viewMode === 'list' ? 'w-48 h-48' : 'w-full h-64'
                          }`}
                        />
                      </Link>
                      
                      <Badge 
                        className={`absolute top-3 left-3 ${
                          product.badge === 'Sale' ? 'bg-red-500' :
                          product.badge === 'New' ? 'bg-green-500' :
                          product.badge === 'Best Seller' ? 'bg-orange-500' :
                          'bg-[#03312f]'
                        }`}
                      >
                        {product.badge}
                      </Badge>

                      {!product.inStock && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <span className="text-white font-semibold">Out of Stock</span>
                        </div>
                      )}

                      <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button 
                          size="sm" 
                          variant="secondary" 
                          className="h-8 w-8 p-0 rounded-full"
                          onClick={() => addToWishlist(product.id)}
                        >
                          <Heart className={`h-4 w-4 ${wishlist.includes(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
                        </Button>
                      </div>
                    </div>

                    <div className={`p-4 ${viewMode === 'list' ? 'flex-1 flex flex-col justify-between' : ''}`}>
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <Link href={`/products/${product.id}`}>
                            <h3 className="font-semibold text-gray-900 group-hover:text-[#03312f] transition-colors">
                              {product.name}
                            </h3>
                          </Link>
                          {viewMode === 'list' && (
                            <div className="text-right ml-4">
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
                          )}
                        </div>
                        
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

                        {viewMode === 'grid' && (
                          <div className="flex items-center gap-2 mb-4">
                            <span className="text-lg font-bold text-[#03312f]">
                              ${product.price}
                            </span>
                            {product.originalPrice && (
                              <span className="text-sm text-gray-500 line-through">
                                ${product.originalPrice}
                              </span>
                            )}
                          </div>
                        )}

                        {/* Features */}
                        <div className="flex flex-wrap gap-1 mb-4">
                          {product.features.slice(0, 2).map((feature, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Button 
                        className="w-full bg-[#03312f] hover:bg-[#024a46] text-white"
                        disabled={!product.inStock}
                      >
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center">
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    Previous
                  </Button>
                  
                  {[...Array(totalPages)].map((_, index) => (
                    <Button
                      key={index}
                      variant={currentPage === index + 1 ? "default" : "outline"}
                      onClick={() => setCurrentPage(index + 1)}
                      className={currentPage === index + 1 ? "bg-[#03312f] text-white" : ""}
                    >
                      {index + 1}
                    </Button>
                  ))}
                  
                  <Button 
                    variant="outline" 
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}