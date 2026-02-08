'use client'; // needed in Next.js App Router to use hooks

import { useState } from 'react';

// Tell TypeScript that window.Razorpay exists
declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function PaymentPage() {
  const [loading, setLoading] = useState(false);

  // Dynamically load Razorpay SDK
  const loadRazorpayScript = () => {
    return new Promise<boolean>((resolve) => {
      if (document.querySelector('#razorpay-sdk')) return resolve(true); // prevent multiple loads
      const script = document.createElement('script');
      script.id = 'razorpay-sdk';
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const startPayment = async () => {
    setLoading(true);

    // 1️⃣ Create an order in your backend
    const orderRes = await fetch('http://127.0.0.1:8000/api/payments/create-order/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: 500, // in rupees
        currency: 'INR',
        receipt: 'rcpt#1',
      }),
    });
    console.log("orderRes",orderRes);
    
    const orderData = await orderRes.json();
    if (!orderRes.ok) {
      alert(orderData.error || 'Order creation failed');
      setLoading(false);
      return;
    }

    // 2️⃣ Load Razorpay SDK if not already loaded
    const sdkLoaded = await loadRazorpayScript();
    if (!sdkLoaded) {
      alert('Razorpay SDK failed to load. Are you online?');
      setLoading(false);
      return;
    }

    // 3️⃣ Open Razorpay checkout
    const options = {
      key: orderData.key_id, // get key_id from backend
      amount: orderData.amount, // in paise
      currency: orderData.currency,
      name: 'My Store',
      description: 'Test Transaction',
      order_id: orderData.order_id, // order_id from backend
      handler: async function (response: any) {
        // Runs after successful payment
        console.log('Payment success', response);

        // 4️⃣ Verify payment signature with your backend
        const verifyRes = await fetch('http://127.0.0.1:8000/api/payments/verify-payment/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          }),
        });
        console.log("page verifyRes",verifyRes);
        
        if (verifyRes.ok) {
          alert('Payment verified!');
        } else {
          alert('Payment verification failed');
        }
      },
      prefill: {
        name: 'John Doe',
        email: 'john@example.com',
        contact: '9999999999',
      },
      theme: {
        color: '#3399cc',
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
    setLoading(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Razorpay Payment</h1>
      <button onClick={startPayment} disabled={loading}>
        {loading ? 'Processing...' : 'Pay ₹500'}
      </button>
    </div>
  );
}
