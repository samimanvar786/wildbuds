'use client';

import { useState } from 'react';
import { X, Truck, Gift, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-[#03312f] text-white py-2 px-4 relative">
      <div className="container mx-auto">
        <div className="flex items-center justify-center text-sm font-medium">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4" />
              <span>Free shipping on orders over ₹2000</span>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <Gift className="h-4 w-4" />
              <span>15% off on first order - Use code: WELCOME15</span>
            </div>
            <div className="hidden lg:flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>24/7 Plant Care Support: +91 98765 43210</span>
            </div>
          </div>
        </div>
      </div>
      
      <Button
        variant="ghost"
        size="sm"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 text-white hover:bg-white/20"
        onClick={() => setIsVisible(false)}
      >
        <X className="h-3 w-3" />
      </Button>
    </div>
  );
}