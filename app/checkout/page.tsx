"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import CheckoutForm, { CustomerDetailsType } from "./CheckoutForm";
import { BillingFormData } from "./BillingAddress";
import OrderSummary from "./OrderSummary";
import Headers from "../../components/layout/Navigation";
import UserDetailsCard from "../checkout/UserDetails";
import { registerUserWithBilling } from "../../lib/api/users";

export default function CheckoutPage() {
  // --- form state ---
  const [customerDetails, setCustomerDetails] = useState<CustomerDetailsType>({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postcode: "",
    country: "",
    password: "",
  });

  const [billingDetails, setBillingDetails] = useState<BillingFormData>({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  const [shippingMethod, setShippingMethod] = useState<string>("standard");
  const [paymentMethod, setPaymentMethod] = useState<{
    method: string;
    cardNumber?: string;
    expiry?: string;
    cvv?: string;
  }>({ method: "cod" });

  // --- inline error objects passed to child components ---
  const [customerErrors, setCustomerErrors] = useState<Record<string, string>>({});
  const [billingErrors, setBillingErrors] = useState<Record<string, string>>({});
  const [paymentErrors, setPaymentErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const cErr: Record<string, string> = {};
    const bErr: Record<string, string> = {};
    const pErr: Record<string, string> = {};
    let valid = true;

    // Customer
    if (!customerDetails.first_name.trim()) {
      cErr.first_name = "First name is required.";
      valid = false;
    }
    if (!customerDetails.last_name.trim()) {
      cErr.last_name = "Last name is required.";
      valid = false;
    }
    if (!customerDetails.email.trim()) {
      cErr.email = "Email is required.";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerDetails.email)) {
      cErr.email = "Enter a valid email address.";
      valid = false;
    }
    if (customerDetails.phone && !/^\+?[0-9]{7,15}$/.test(customerDetails.phone)) {
      cErr.phone = "Enter a valid phone number.";
      valid = false;
    }

    // Billing
    if (!billingDetails.first_name.trim()) {
      bErr.first_name = "First name is required.";
      valid = false;
    }
    if (!billingDetails.last_name.trim()) {
      bErr.last_name = "Last name is required.";
      valid = false;
    }
    if (!billingDetails.email.trim()) {
      bErr.email = "Email is required.";
      valid = false;
    }
    if (!billingDetails.phone.trim()) {
      bErr.phone = "Phone number is required.";
      valid = false;
    }
    if (!billingDetails.address.trim()) {
      bErr.address = "Address is required.";
      valid = false;
    }
    if (!billingDetails.city.trim()) {
      bErr.city = "City is required.";
      valid = false;
    }
    if (!billingDetails.state.trim()) {
      bErr.state = "State is required.";
      valid = false;
    }
    if (!billingDetails.postalCode.trim()) {
      bErr.postalCode = "Postal code is required.";
      valid = false;
    }
    if (!billingDetails.country.trim()) {
      bErr.country = "Country is required.";
      valid = false;
    }
    if (billingDetails.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(billingDetails.email)) {
      bErr.email = "Enter a valid billing email.";
      valid = false;
    }

    // Shipping
    if (!shippingMethod) {
      toast.error("Please select a shipping method.");
      valid = false;
    }

    // Payment
    if (!paymentMethod.method || paymentMethod.method.trim() === "") {
      pErr.method = "Please select a payment method.";
      valid = false;
    } else if (paymentMethod.method === "card") {
      if (!paymentMethod.cardNumber || paymentMethod.cardNumber.replace(/\s+/g, "").length < 12) {
        pErr.cardNumber = "Enter a valid card number.";
        valid = false;
      }
      if (!paymentMethod.expiry) {
        pErr.expiry = "Card expiry is required.";
        valid = false;
      }
      if (!paymentMethod.cvv || !/^[0-9]{3,4}$/.test(paymentMethod.cvv)) {
        pErr.cvv = "Enter a valid CVV.";
        valid = false;
      }
    }

    setCustomerErrors(cErr);
    setBillingErrors(bErr);
    setPaymentErrors(pErr);

    if (!valid) {
      toast.error("Please fix the validation errors highlighted on the form.");
    }

    return valid;
  };

  // final submit (called from OrderSummary button or page)
  const handleCheckout = async () => {
    const ok = validateForm();
    if (!ok) return;

    // prepare payloads
    const userPayload = {
      first_name: customerDetails.first_name || billingDetails.first_name,
      last_name: customerDetails.last_name || billingDetails.last_name,
      email: customerDetails.email || billingDetails.email,
      phone: customerDetails.phone || billingDetails.phone,
      password: customerDetails.password || "Temp@12345", // ideally ask user to set password or use a dedicated flow
    };

    const billingPayload = {
      address_line_1: billingDetails.address,
      address_line_2: "", // if you have a second line field, map it
      city: billingDetails.city,
      state: billingDetails.state,
      postcode: billingDetails.postalCode,
      country: billingDetails.country,
    };

    try {
      toast.loading("Placing order...");
      // call combined helper, try auto-login by passing the same password
      const result = await registerUserWithBilling(userPayload, billingPayload, {
        autoLoginPassword: userPayload.password,
        saveTokenToLocalStorage: true,
      });

      toast.dismiss();
      toast.success("Order placed successfully!");
      console.log("Combined Response:", result);

      // TODO: proceed to payment or order confirmation page
      // e.g., router.push("/order/confirmation")
    } catch (err: any) {
      toast.dismiss();
      console.error("Checkout error:", err);
      toast.error(err.message || "Something went wrong while placing the order.");
    }
  };

  const user = {
    name: "Samim Anvar",
    email: "samim@example.com",
    phone: "+91 9876543210",
    billing: {
      fullName: "Samim Anvar",
      address: "123 MG Road, Bangalore",
      city: "Bangalore",
      postalCode: "560001",
    },
  };

  return (
    <>
      <Headers />

      <div className="max-w-6xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT SIDE — Checkout Form */}
        <div className="lg:col-span-2 space-y-6">
          <UserDetailsCard user={user} />
          <CheckoutForm
            customerDetails={customerDetails}
            setCustomerDetails={setCustomerDetails}
            customerErrors={customerErrors}
            billingDetails={billingDetails}
            setBillingDetails={setBillingDetails}
            billingErrors={billingErrors}
            shippingMethod={shippingMethod}
            setShippingMethod={setShippingMethod}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            paymentErrors={paymentErrors}
          />
        </div>

        {/* RIGHT SIDE — Order Summary */}
        <div className="lg:col-span-1">
          <OrderSummary
            shippingMethod={shippingMethod}
            paymentMethod={paymentMethod.method}
            onPlaceOrder={handleCheckout}
          />
        </div>
      </div>
    </>
  );
}
