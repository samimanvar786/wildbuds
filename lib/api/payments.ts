const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export interface CreateOrderPayload {
  items: {
    product_id: number;
    name: string;
    price: number;
    quantity: number;
  }[];
}


export interface CreateOrderPayload {
  items: {
    product_id: number;
    name: string;
    price: number;
    quantity: number;
  }[];
}

export const createRazorpayOrder = async (payload: CreateOrderPayload) => {
  const res = await fetch(
    `${BASE_URL}/payments/create-order/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
      },
      
      body: JSON.stringify(payload),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to create Razorpay order");
  }

  return res.json();
};




export const verifyPayment = async (data: {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}) => {
  const res = await fetch(`${BASE_URL}/payments/verify-payment/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Payment Verification failed");
  return res.json();
};

export const clearCart = () => {
  localStorage.removeItem("cartItems");
};

export const clearWishlist = () => {
  localStorage.removeItem("wishlist");
};