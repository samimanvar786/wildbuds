"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function ShippingMethod({ value, onChange }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Truck className="h-5 w-5" /> Shipping Method
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex flex-col space-y-2">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={value === "standard"}
              onChange={() => onChange("standard")}
            />
            Standard Shipping (3-5 days)
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={value === "express"}
              onChange={() => onChange("express")}
            />
            Express Shipping (1-2 days)
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={value === "pickup"}
              onChange={() => onChange("pickup")}
            />
            Store Pickup
          </label>
        </div>
      </CardContent>
    </Card>
  );
}
