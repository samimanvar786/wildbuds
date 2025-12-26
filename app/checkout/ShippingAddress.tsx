import React from "react";

interface ShippingAddressProps {
  value: {
    address1: string;
    address2: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  onChange: (field: string, value: string) => void;
}

const ShippingAddress: React.FC<ShippingAddressProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Shipping Address</h2>
      <input
        type="text"
        placeholder="Address Line 1"
        value={value.address1}
        onChange={(e) => onChange("address1", e.target.value)}
        className="border rounded-lg px-3 py-2 w-full"
      />
      <input
        type="text"
        placeholder="Address Line 2"
        value={value.address2}
        onChange={(e) => onChange("address2", e.target.value)}
        className="border rounded-lg px-3 py-2 w-full"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="City"
          value={value.city}
          onChange={(e) => onChange("city", e.target.value)}
          className="border rounded-lg px-3 py-2 w-full"
        />
        <input
          type="text"
          placeholder="State"
          value={value.state}
          onChange={(e) => onChange("state", e.target.value)}
          className="border rounded-lg px-3 py-2 w-full"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="ZIP / Postal Code"
          value={value.zip}
          onChange={(e) => onChange("zip", e.target.value)}
          className="border rounded-lg px-3 py-2 w-full"
        />
        <input
          type="text"
          placeholder="Country"
          value={value.country}
          onChange={(e) => onChange("country", e.target.value)}
          className="border rounded-lg px-3 py-2 w-full"
        />
      </div>
    </div>
  );
};

export default ShippingAddress;
