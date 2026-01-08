"use client";

import CustomerDetails from "./CustomerDetails";
import ShippingMethod from "./ShippingMethod";
import PaymentMethod from "./PaymentMethod";
import BillingAddress, { BillingFormData } from "./BillingAddress";
import { PaymentMethodType } from "@/types/payment";

export interface CustomerDetailsType {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  password: string;
}

interface CheckoutFormProps {
  customerDetails: CustomerDetailsType;
  setCustomerDetails: (data: CustomerDetailsType) => void;
  customerErrors: Record<string, string>;

  billingDetails: BillingFormData;
  setBillingDetails: (data: BillingFormData) => void;
  billingErrors: Record<string, string>;

  shippingMethod: string;
  setShippingMethod: (value: string) => void;

  paymentMethod: PaymentMethodType;
  setPaymentMethod: (
    updater: (prev: PaymentMethodType) => PaymentMethodType
  ) => void;

  paymentErrors: Record<string, string>;
}

export default function CheckoutForm({
  customerDetails,
  setCustomerDetails,
  customerErrors,
  billingDetails,
  setBillingDetails,
  billingErrors,
  shippingMethod,
  setShippingMethod,
  paymentMethod,
  setPaymentMethod,
  paymentErrors,
}: CheckoutFormProps) {
  const handleCustomerChange = (
    field: keyof CustomerDetailsType,
    value: string
  ) => {
    setCustomerDetails({
      ...customerDetails,
      [field]: value,
    });
  };

  const handleBillingChange = (data: BillingFormData) => {
    setBillingDetails(data);
  };

  const handlePaymentChange = (
    field: keyof PaymentMethodType,
    value: string
  ) => {
    setPaymentMethod((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="space-y-6">
      {/* Uncomment when ready */}
      {/* <CustomerDetails
        details={customerDetails}
        onChange={handleCustomerChange}
        errors={customerErrors}
      /> */}

      {/* <BillingAddress
        value={billingDetails}
        onChange={handleBillingChange}
        errors={billingErrors}
      /> */}

      <ShippingMethod
        value={shippingMethod}
        onChange={setShippingMethod}
      />

      <PaymentMethod
        value={paymentMethod}
        onChange={handlePaymentChange}
        errors={paymentErrors}
      />
    </div>
  );
}
