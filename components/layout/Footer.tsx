import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Footer() {
  return (
    <footer className="relative bg-[#03312f] text-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-20">
        <Image
          src="/Strips 2 (1).jpg"
          alt="Footer background"
          fill
          className="object-cover"
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="mb-4">
              <Image
                src="/IMG-20250615-WA0005.jpg"
                alt="Wild Buds Botanics"
                width={200}
                height={80}
                className="h-12 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-gray-200 mb-4">
              Your premium destination for beautiful plants, flowers, and botanical accessories to transform your space into a natural paradise.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/about" className="block text-gray-200 hover:text-white transition-colors">
                About Us
              </Link>
              <Link href="/products" className="block text-gray-200 hover:text-white transition-colors">
                Products
              </Link>
              <Link href="/categories" className="block text-gray-200 hover:text-white transition-colors">
                Categories
              </Link>
              <Link href="/contact" className="block text-gray-200 hover:text-white transition-colors">
                Contact Us
              </Link>
              <Link href="/care-guide" className="block text-gray-200 hover:text-white transition-colors">
                Plant Care Guide
              </Link>
            </div>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Customer Service</h3>
            <div className="space-y-2">
              <Link href="/help" className="block text-gray-200 hover:text-white transition-colors">
                Help Center
              </Link>
              <Link href="/returns" className="block text-gray-200 hover:text-white transition-colors">
                Returns & Exchanges
              </Link>
              <Link href="/shipping" className="block text-gray-200 hover:text-white transition-colors">
                Shipping Info
              </Link>
              <Link href="/privacy" className="block text-gray-200 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="block text-gray-200 hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-gray-200" />
                <span className="text-gray-200">123 Garden Street, Green City, GC 12345</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-gray-200" />
                <span className="text-gray-200">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-gray-200" />
                <span className="text-gray-200">hello@wildbudsbotonics.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-8 pt-8 text-center">
          <p className="text-gray-200">
            © 2024 Wild Buds Botanics. All rights reserved. Cultivating beauty, naturally.
          </p>
        </div>
      </div>
    </footer>
  );
}