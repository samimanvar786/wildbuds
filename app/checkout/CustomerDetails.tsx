"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { User } from "lucide-react";

interface Props {
  details: any;
  onChange: (field: string, value: string) => void;
  errors?: Record<string, string>;
}

export default function CustomerDetails({ details, onChange, errors = {} }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" /> Customer Details
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>First Name *</Label>
            <input
              type="text"
              value={details.first_name}
              onChange={(e) => onChange("first_name", e.target.value)}
              className={`border rounded-lg w-full px-3 py-2 ${
                errors.first_name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.first_name && <p className="text-red-500 text-sm mt-1">{errors.first_name}</p>}
          </div>

          <div>
            <Label>Last Name *</Label>
            <input
              type="text"
              value={details.last_name}
              onChange={(e) => onChange("last_name", e.target.value)}
              className={`border rounded-lg w-full px-3 py-2 ${
                errors.last_name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.last_name && <p className="text-red-500 text-sm mt-1">{errors.last_name}</p>}
          </div>
        </div>

        <div>
          <Label>Email *</Label>
          <input
            type="email"
            value={details.email}
            onChange={(e) => onChange("email", e.target.value)}
            className={`border rounded-lg w-full px-3 py-2 ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <Label>Phone</Label>
          <input
            type="tel"
            value={details.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            className={`border rounded-lg w-full px-3 py-2 ${
              errors.phone ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>
      </CardContent>
    </Card>
  );
}
