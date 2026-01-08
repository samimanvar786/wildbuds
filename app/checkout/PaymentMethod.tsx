"use client";

import { PaymentMethodType } from "@/types/payment";

interface Props {
  value: PaymentMethodType;
  onChange: (field: keyof PaymentMethodType, value: string) => void;
  errors?: Record<string, string>;
}

export default function PaymentMethod({
  value,
  onChange,
  errors = {},
}: Props) {
  const selectMethod = (method: PaymentMethodType["method"]) => {
    onChange("method", method);
  };

  return (
    <div className="border rounded-lg p-4">
      <h4 className="font-medium mb-2">Payment Method</h4>

      <div className="space-y-3">
        <label className="flex items-center gap-3">
          <input
            type="radio"
            name="payment"
            checked={value.method === "cod"}
            onChange={() => selectMethod("cod")}
          />
          <span>Cash on Delivery (COD)</span>
        </label>

        <label className="flex items-center gap-3">
          <input
            type="radio"
            name="payment"
            checked={value.method === "card"}
            onChange={() => selectMethod("card")}
          />
          <span>Credit / Debit Card</span>
        </label>

        <label className="flex items-center gap-3">
          <input
            type="radio"
            name="payment"
            checked={value.method === "upi"}
            onChange={() => selectMethod("upi")}
          />
          <span>UPI (Google Pay / PhonePe / Paytm)</span>
        </label>
      </div>
    </div>
  );
}
