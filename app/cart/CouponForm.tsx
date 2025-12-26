'use client';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tag } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface Props {
  onApply: (code: string, discount: number) => void;
  appliedCoupon: { code: string; discount: number } | null;
  discountAmount: number;
}

export default function CouponForm({ onApply, appliedCoupon, discountAmount }: Props) {
  const [code, setCode] = useState('');

  const handleApply = () => {
    if (code.toLowerCase() === 'save10') {
      onApply(code, 0.1);
      setCode('');
    }
  };

  return (
    <Card className="mt-6">
      <CardContent className="p-6">
        <div className="flex gap-4">
          <Input
            placeholder="Enter coupon code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <Button variant="outline" onClick={handleApply}>
            <Tag className="h-4 w-4 mr-2" /> Apply
          </Button>
        </div>
        {appliedCoupon && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
            Coupon "{appliedCoupon.code}" applied! You saved ${discountAmount.toFixed(2)}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
