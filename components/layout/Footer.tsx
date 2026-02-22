import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Footer() {
  return (
    <footer className="relative bg-[#D86A8C] text-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-40">
        <Image
          src="/Strips.jpg"
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

            <p className="text-white/90 mb-4">
              Your premium destination for beautiful plants, flowers, and botanical accessories to transform your space into a natural paradise.
            </p>

            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <Button
                  key={i}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20"
                >
                  <Icon className="h-4 w-4" />
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">Quick Links</h3>
            <div className="space-y-2">
              {[
                ['About Us', '/about'],
                ['Products', '/products'],
                ['Categories', '/categories'],
                ['Contact Us', '/contact'],
                ['Plant Care Guide', '/care-guide'],
              ].map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  className="block text-white/90 hover:text-white transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">Customer Service</h3>
            <div className="space-y-2">
              {[
                ['Help Center', '/help'],
                ['Returns & Exchanges', '/returns'],
                ['Shipping Info', '/shipping'],
                ['Privacy Policy', '/privacy'],
                ['Terms of Service', '/terms'],
              ].map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  className="block text-white/90 hover:text-white transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">Contact Info</h3>
            <div className="space-y-3 text-white/90">
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-white" />
                <span>123 Garden Street, Green City, GC 12345</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-white" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-white" />
                <span>hello@wildbudsbotonics.com</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-white/30 mt-8 pt-8 text-center">
          <p className="text-white/90">
            © 2024 Wild Buds Botanics. All rights reserved. Cultivating beauty, naturally.
          </p>
        </div>
      </div>
    </footer>
  );
}
