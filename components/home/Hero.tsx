'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Native Nettle",
      subtitle: "Himalayan Native Nettle",
      description: "Transform your space with our curated selection of premium plants, flowers, and botanical accessories.",
      buttonText: "Shop Plants",
      image: "/nattive.png"
    },
    {
      title: "Pristine Pine",
      subtitle: "Himalayan Pristine Pine",
      description: "Discover our stunning collection of indoor plants perfect for every room and lifestyle.",
      buttonText: "Explore Indoor Plants",
      image: "/pristine.jpg"
    },
    {
      title: "Himalayan",
      subtitle: "Wild Buds",
      description: "Everything you need to create and maintain your perfect garden sanctuary.",
      buttonText: "Shop Garden",
      image: "Strips.jpg"
    }
  ];

  return (
    <section className="relative h-[70vh] bg-gradient-to-br from-[#03312f] to-[#024a46] overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={slides[currentSlide].image}
          alt="Wild Buds Botanics"
          fill
          className="object-cover opacity-50"
          priority
        />
      </div>

      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <div className="space-y-6">
              <div className="space-y-2">
                {/* <p className="text-white/80 text-sm font-medium tracking-wider uppercase">
                  {slides[currentSlide].subtitle}
                </p> */}
                {/* <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                  {slides[currentSlide].title}
                </h1> */}
              </div>
              
              {/* <p className="text-white/90 text-lg leading-relaxed max-w-lg">
                {slides[currentSlide].description}
              </p> */}
              
              {/* <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-white text-[#03312f] hover:bg-gray-100 font-semibold px-8 group"
                >
                  {slides[currentSlide].buttonText}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-[#03312f] px-8"
                >
                  <Play className="mr-2 h-4 w-4" />
                  Care Guide
                </Button>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide 
                  ? 'bg-white' 
                  : 'bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-32 h-32 bg-white/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-24 h-24 bg-white/5 rounded-full blur-2xl"></div>
    </section>
  );
}