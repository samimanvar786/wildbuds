'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCategories } from '@/hooks/useCategories';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { fetchCategories, Category } from "@/lib/api/categories";


export default function Categories() {
  const { categories, loading, error } = useCategories();
  

  if (loading) {
    return <div className="text-center py-16">Loading categories...</div>;
  }

  if (error) {
    return <div className="text-center py-16 text-red-600">Error: {error}</div>;
  }

  return (
    <>
    <Navigation/>
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Explore our diverse collection of plants and botanical accessories, 
            carefully curated to bring natures beauty into your life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {categories.map((category) => (
            <Link key={category.id} href="/products">
              <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-20 group-hover:opacity-30 transition-opacity`}></div>
                    <div className="absolute top-4 right-4">
                      <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                        <span className="text-sm font-medium text-gray-800">
                          {category.productCount} items
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#03312f] transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {category.description}
                    </p>
                    <div className="flex items-center text-[#03312f] font-medium group-hover:gap-2 transition-all">
                      <span>Shop Now</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link href="/products">
            <Button 
              variant="outline" 
              size="lg" 
              className="border-[#03312f] text-[#03312f] hover:bg-[#03312f] hover:text-white"
            >
              View All Categories
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
    <Footer/>
    </>
  );
}
