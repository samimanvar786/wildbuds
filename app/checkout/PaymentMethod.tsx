"use client";

import { useState } from "react";

interface Props {
  value: {
    method: "card" | "upi" | "cod";
    cardNumber?: string;
    expiry?: string;
    cvv?: string;
    upiId?: string;
  };
  onChange: (field: string, value: string) => void;
  errors?: Record<string, string>;
}

export default function PaymentMethod({ value, onChange, errors = {} }: Props) {
  const selectMethod = (method: "card" | "upi" | "cod") => {
    onChange("method", method);
  };

  return (
    <div className="border rounded-lg p-4">
      <h4 className="font-medium mb-2">Payment Method</h4>

      <div className="space-y-3">
        {/* COD */}
        <label className="flex items-center gap-3">
          <input
            type="radio"
            name="payment"
            checked={value.method === "cod"}
            onChange={() => selectMethod("cod")}
          />
          <span>Cash on Delivery (COD)</span>
        </label>

        {/* CARD */}
        <label className="flex items-center gap-3">
          <input
            type="radio"
            name="payment"
            checked={value.method === "card"}
            onChange={() => selectMethod("card")}
          />
          <span>Credit / Debit Card</span>
        </label>

        {/* UPI */}
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
