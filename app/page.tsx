'use client';

import Hero from '@/components/home/Hero';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import Categories from '@/components/home/Categories';
import NewsletterSignup from '@/components/home/NewsletterSignup';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <Hero />
        <Categories />
        <FeaturedProducts />
        <NewsletterSignup />
      </main>
      <Footer />
    </div>
  );
}