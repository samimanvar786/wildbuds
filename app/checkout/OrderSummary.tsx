"use client";

import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { createRazorpayOrder, verifyPayment } from "@/lib/api/payments";
// import { clearCart, clearWishlist } from "@/lib/api/payments";
import { getUser } from "@/lib/api/users";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearCart } from "@/store/cartSlice";
import { removeFromWishlist } from "@/store/wishlistSlice";


const CURRENCY_SYMBOL = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL;
const RAZORPAY_KEY = process.env.NEXT_PUBLIC_RAZORPAY_KEY!;

interface OrderSummaryProps {
  shippingMethod: string;
  paymentMethod: "card" | "upi" | "cod";
  onPlaceOrder: () => void;
}

export default function OrderSummary({
  shippingMethod,
  paymentMethod,
  onPlaceOrder,
}: OrderSummaryProps) {
  
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const { cartItems } = useCart();
  
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const CGST_RATE = 0.09;
  const SGST_RATE = 0.09;

  const cgst = subtotal * CGST_RATE;
  const sgst = subtotal * SGST_RATE;

  const shipping =
    shippingMethod === "express" ? 199 : shippingMethod === "standard" ? 99 : 0;

  const total = subtotal + cgst + sgst + shipping;
  
  // const handlePayment = async () => {
  //   if (paymentMethod === "cod") {
  //     onPlaceOrder();
  //     return;
  //   }

  //   if (!(window as any).Razorpay) {
  //     alert("Razorpay SDK not loaded!");
  //     return;
  //   }

  //   // 🟢 FULL ORDER DATA SENT TO BACKEND
  //   const payload = {
  //     items: cartItems.map((item) => ({
  //       product_id: item.id,
  //       name: item.name,
  //       price: item.price,
  //       quantity: item.quantity,
  //     })),
  //     subtotal,
  //     cgst,
  //     sgst,
  //     shipping,
  //     total,
  //   };

  //   const storedUser = localStorage.getItem("auth_user");
  //   let user: any = null;

  //   if (storedUser) {
  //     try {
  //       user = JSON.parse(storedUser);
  //     } catch (error) {
  //       console.error("Error parsing user JSON:", error);
  //     }
  //   }

  //   console.log("User from localStorage:", user);

  //   // 🟢 Backend returns FULL CORRECT AMOUNT IN PAISE
  //   const order = await createRazorpayOrder(payload);
  //   console.log("Order from backend:", order);
  //   const razoypay_amount = total * 100;
  //   const options = {
  //     key: RAZORPAY_KEY,
  //     amount: order.amount, // ALWAYS from backend
  //     currency: order.currency,
  //     name: "Wild Buds Botanics",
  //     description: "Order Payment",
  //     order_id: order.order_id,
  //     image: "https://www.razorpay.com/images/logo/logo-white-b.png",

  //     handler: async function (response: any) {
  //       console.log("Payment Success:", response);

  //       const verifyPayload = {
  //         razorpay_order_id: response.razorpay_order_id,
  //         razorpay_payment_id: response.razorpay_payment_id,
  //         razorpay_signature: response.razorpay_signature,
  //       };

  //       try {
  //         const verify = await verifyPayment(verifyPayload);
  //         if (verify.status === "success") {
  //           onPlaceOrder(); // Save order in system if needed
  //           clearCart();
  //           clearWishlist();
  //           window.location.href = "/orders"; // Redirect only when verified
  //         } else {
  //           alert("Payment Verification Failed!");
  //         }
  //       } catch (error) {
  //         console.error("Verification Error: ", error);
  //         alert("Verification Failed. Payment not confirmed.");
  //       }
  //     },

  //     prefill: {
  //       email: user?.email || "customer@example.com",
  //       contact: user?.phone || "9999999999",
  //     },

  //     method: {
  //       upi: paymentMethod === "upi",
  //       card: paymentMethod === "card",
  //     },

  //     upi: {
  //       mode: "intent", // supports GPay / PhonePe / Paytm
  //     },

  //     theme: {
  //       color: "#03312f",
  //     },
  //   };

  //   console.log("Final Razorpay Options:", options);

  //   const razorpay = new (window as any).Razorpay(options);
  //   razorpay.open();
  // };

  const handlePayment = async () => {
    if (paymentMethod === "cod") {
      onPlaceOrder();
      dispatch(clearCart());
      window.location.href = "/orders";
      return;
    }

    if (!(window as any).Razorpay) {
      alert("Razorpay SDK not loaded!");
      return;
    }

    const payload = {
      items: cartItems.map((item) => ({
        product_id: Number(item.id),
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      subtotal,
      cgst,
      sgst,
      shipping,
      total,
    };

      const storedUser = localStorage.getItem("auth_user");
    let user: any = null;

    if (storedUser) {
      try {
        user = JSON.parse(storedUser);
      } catch (error) {
        console.error("Error parsing user JSON:", error);
      }
    }

    const order = await createRazorpayOrder(payload);

    const options = {
      key: RAZORPAY_KEY,
      amount: order.amount,
      currency: order.currency,
      name: "Wild Buds Botanics",
      description: "Order Payment",
      order_id: order.order_id,
      handler: async function (response: any) {
        try {
          const verify = await verifyPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });

          if (verify.status === "success") {
            onPlaceOrder();

            dispatch(clearCart());

            // Remove purchased items from wishlist if exist
            payload.items.forEach((i) => {
              dispatch(removeFromWishlist(i.product_id));
            });

            window.location.href = "/orders";
          } else {
            alert("Payment Verification Failed!");
          }
        } catch (error) {
          console.error("Verification Error: ", error);
          alert("Verification Failed. Payment not confirmed.");
        }
      },
      prefill: {
        name: user?.name,
        email: user?.email || "customer@example.com",
        contact: user?.phone || "9999999999",
      },
      theme: { color: "#03312f" },
    };

    const razorpay = new (window as any).Razorpay(options);
    razorpay.open();
  };
  
  const buttonText =
    paymentMethod === "cod"
      ? "Place Order (COD)"
      : paymentMethod === "upi"
      ? "Pay via UPI"
      : "Pay with Card";

  return (
    <div className="lg:col-span-1">
      <div className="sticky top-6 border rounded-xl shadow-sm bg-white">
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold">Order Summary</h3>
        </div>

        <div className="p-4 space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex gap-3">
              <div className="w-16 h-16 relative rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1">
                <h4 className="font-medium text-sm">{item.name}</h4>
                <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
              </div>

              <p className="font-medium">
                {CURRENCY_SYMBOL}
                {(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}

          <Separator />

          {/* PRICE BREAKDOWN BELOW */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>
                {CURRENCY_SYMBOL}
                {subtotal.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between">
              <span>CGST (9%)</span>
              <span>
                {CURRENCY_SYMBOL}
                {cgst.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between">
              <span>SGST (9%)</span>
              <span>
                {CURRENCY_SYMBOL}
                {sgst.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}</span>
            </div>

            <Separator />

            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span className="text-[#03312f]">₹{total.toFixed(2)}</span>
            </div>
          </div>

          <Button
            type="button"
            onClick={handlePayment}
            className="w-full bg-[#03312f] hover:bg-[#024a46] text-white font-semibold py-3"
          >
            <Lock className="mr-2 h-4 w-4" />
            {buttonText}
          </Button>

          <p className="text-center text-sm text-gray-600 flex items-center justify-center gap-1">
            <Lock className="h-3 w-3" />
            Secure checkout powered by Razorpay
          </p>
        </div>
      </div>
    </div>
  );
}
