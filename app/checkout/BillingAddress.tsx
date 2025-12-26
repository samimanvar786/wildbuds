"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export interface BillingFormData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

interface Props {
  value: BillingFormData;
  onChange: (data: BillingFormData) => void;
  errors?: Record<string, string>;
}

export default function BillingAddress({
  value,
  onChange,
  errors = {},
}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Billing Address</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>First Name *</Label>
            <input
              type="text"
              value={value.first_name}
              onChange={(e) =>
                onChange({ ...value, first_name: e.target.value })
              }
              className={`border rounded-lg w-full px-3 py-2 ${
                errors.first_name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.first_name && (
              <p className="text-red-500 text-sm mt-1">{errors.first_name}</p>
            )}
          </div>

          <div>
            <Label>Last Name *</Label>
            <input
              type="text"
              value={value.last_name}
              onChange={(e) =>
                onChange({ ...value, last_name: e.target.value })
              }
              className={`border rounded-lg w-full px-3 py-2 ${
                errors.last_name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.last_name && (
              <p className="text-red-500 text-sm mt-1">{errors.last_name}</p>
            )}
          </div>
        </div>

        <div>
          <Label>Email</Label>
          <input
            type="email"
            value={value.email}
            onChange={(e) => onChange({ ...value, email: e.target.value })}
            className={`border rounded-lg w-full px-3 py-2 ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <Label>Phone</Label>
          <input
            type="tel"
            value={value.phone}
            onChange={(e) => onChange({ ...value, phone: e.target.value })}
            className={`border rounded-lg w-full px-3 py-2 ${
              errors.phone ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>

        <div>
          <Label>Address *</Label>
          <textarea
            value={value.address}
            onChange={(e) => onChange({ ...value, address: e.target.value })}
            className={`border rounded-lg w-full px-3 py-2 resize-none ${
              errors.address ? "border-red-500" : "border-gray-300"
            }`}
            rows={4} // you can adjust height
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">{errors.address}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label>City *</Label>
            <input
              type="text"
              value={value.city}
              onChange={(e) => onChange({ ...value, city: e.target.value })}
              className={`border rounded-lg w-full px-3 py-2 ${
                errors.city ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">{errors.city}</p>
            )}
          </div>

          <div>
            <Label>State *</Label>
            <input
              type="text"
              value={value.state}
              onChange={(e) => onChange({ ...value, state: e.target.value })}
              className={`border rounded-lg w-full px-3 py-2 ${
                errors.state ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.state && (
              <p className="text-red-500 text-sm mt-1">{errors.state}</p>
            )}
          </div>

          <div>
            <Label>Postal Code *</Label>
            <input
              type="text"
              value={value.postalCode}
              onChange={(e) =>
                onChange({ ...value, postalCode: e.target.value })
              }
              className={`border rounded-lg w-full px-3 py-2 ${
                errors.postalCode ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.postalCode && (
              <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>
            )}
          </div>
        </div>

        <div>
          <Label>Country *</Label>
          <input
            type="text"
            value={value.country}
            onChange={(e) => onChange({ ...value, country: e.target.value })}
            className={`border rounded-lg w-full px-3 py-2 ${
              errors.country ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.country && (
            <p className="text-red-500 text-sm mt-1">{errors.country}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
