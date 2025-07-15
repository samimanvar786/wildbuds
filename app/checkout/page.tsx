'use client';

import { useState } from 'react';
import Image from 'next/image';
import { CreditCard, Truck, MapPin, Phone, Mail, Lock, ArrowLeft, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState('razorpay');
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [billingAddress, setBillingAddress] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: ''
  });

  const cartItems = [
    {
      id: 1,
      name: "Monstera Deliciosa",
      price: 299.99,
      quantity: 1,
      image: "https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      size: "Medium"
    },
    {
      id: 2,
      name: "Snake Plant",
      price: 199.99,
      quantity: 2,
      image: "https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      size: "Small"
    }
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = shippingMethod === 'express' ? 15.99 : shippingMethod === 'standard' ? 9.99 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleInputChange = (field: string, value: string) => {
    setCustomerDetails(prev => ({ ...prev, [field]: value }));
  };

  const handleRazorpayPayment = async () => {
    try {
      // Initialize Razorpay payment
      const options = {
        key: 'rzp_test_1234567890', // Replace with your Razorpay key
        amount: Math.round(total * 100), // Amount in paise
        currency: 'INR',
        name: 'Wild Buds Botanics',
        description: 'Plant Purchase',
        order_id: 'order_' + Date.now(), // Generate order ID
        handler: function (response: any) {
          console.log('Payment successful:', response);
          alert('Payment successful! Order confirmed.');
          // Redirect to order confirmation page
        },
        prefill: {
          name: `${customerDetails.firstName} ${customerDetails.lastName}`,
          email: customerDetails.email,
          contact: customerDetails.phone
        },
        theme: {
          color: '#03312f'
        }
      };

      // In a real application, you would load Razorpay script dynamically
      console.log('Razorpay payment options:', options);
      alert('Razorpay payment initiated! (Demo mode)');
      
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
    }
  };

  const handleCODOrder = () => {
    console.log('Processing COD order...', {
      customerDetails,
      cartItems,
      total
    });
    
    alert('Order placed successfully! You will pay on delivery.');
    // Redirect to order confirmation page
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate customer details
    if (!customerDetails.firstName || !customerDetails.lastName || !customerDetails.email || !customerDetails.address) {
      alert('Please fill in all required fields.');
      return;
    }
    
    if (paymentMethod === 'razorpay') {
      handleRazorpayPayment();
    } else {
      handleCODOrder();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Link href="/cart">
              <Button variant="ghost" className="p-2">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Checkout Form */}
              <div className="lg:col-span-2 space-y-6">
                {/* Customer Details */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Customer Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input 
                          id="firstName" 
                          placeholder="John" 
                          value={customerDetails.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input 
                          id="lastName" 
                          placeholder="Doe" 
                          value={customerDetails.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="john@example.com" 
                        value={customerDetails.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input 
                        id="phone" 
                        type="tel" 
                        placeholder="+91 98765 43210" 
                        value={customerDetails.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Shipping Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Truck className="h-5 w-5" />
                      Shipping Address
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="address">Address *</Label>
                      <Input 
                        id="address" 
                        placeholder="123 Main Street" 
                        value={customerDetails.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city">City *</Label>
                        <Input 
                          id="city" 
                          placeholder="Mumbai" 
                          value={customerDetails.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">State *</Label>
                        <Input 
                          id="state" 
                          placeholder="Maharashtra" 
                          value={customerDetails.state}
                          onChange={(e) => handleInputChange('state', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="zip">PIN Code *</Label>
                        <Input 
                          id="zip" 
                          placeholder="400001" 
                          value={customerDetails.zip}
                          onChange={(e) => handleInputChange('zip', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Shipping Method */}
                <Card>
                  <CardHeader>
                    <CardTitle>Shipping Method</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup value={shippingMethod} onValueChange={setShippingMethod}>
                      <div className="flex items-center space-x-2 p-4 border rounded-lg">
                        <RadioGroupItem value="free" id="free" />
                        <Label htmlFor="free" className="flex-1 cursor-pointer">
                          <div className="flex justify-between">
                            <div>
                              <p className="font-medium">Free Shipping</p>
                              <p className="text-sm text-gray-600">5-7 business days</p>
                            </div>
                            <span className="font-medium">Free</span>
                          </div>
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-2 p-4 border rounded-lg">
                        <RadioGroupItem value="standard" id="standard" />
                        <Label htmlFor="standard" className="flex-1 cursor-pointer">
                          <div className="flex justify-between">
                            <div>
                              <p className="font-medium">Standard Shipping</p>
                              <p className="text-sm text-gray-600">3-5 business days</p>
                            </div>
                            <span className="font-medium">₹99</span>
                          </div>
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-2 p-4 border rounded-lg">
                        <RadioGroupItem value="express" id="express" />
                        <Label htmlFor="express" className="flex-1 cursor-pointer">
                          <div className="flex justify-between">
                            <div>
                              <p className="font-medium">Express Shipping</p>
                              <p className="text-sm text-gray-600">1-2 business days</p>
                            </div>
                            <span className="font-medium">₹199</span>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>

                {/* Payment Method */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      Payment Method
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                      <div className="flex items-center space-x-2 p-4 border rounded-lg">
                        <RadioGroupItem value="razorpay" id="razorpay" />
                        <Label htmlFor="razorpay" className="flex-1 cursor-pointer">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                              PAY
                            </div>
                            <div>
                              <p className="font-medium">Razorpay</p>
                              <p className="text-sm text-gray-600">UPI, Cards, NetBanking, Wallets</p>
                            </div>
                          </div>
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-2 p-4 border rounded-lg">
                        <RadioGroupItem value="cod" id="cod" />
                        <Label htmlFor="cod" className="flex-1 cursor-pointer">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-8 bg-green-600 rounded flex items-center justify-center text-white text-xs font-bold">
                              COD
                            </div>
                            <div>
                              <p className="font-medium">Cash on Delivery</p>
                              <p className="text-sm text-gray-600">Pay when you receive your order</p>
                            </div>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>

                {/* Billing Address */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      Billing Address
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-2 mb-4">
                      <Checkbox 
                        id="sameAsShipping" 
                        checked={!billingAddress}
                        onCheckedChange={(checked) => setBillingAddress(!checked)}
                      />
                      <Label htmlFor="sameAsShipping">Same as shipping address</Label>
                    </div>
                    
                    {billingAddress && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="billingFirstName">First Name</Label>
                            <Input id="billingFirstName" placeholder="John" />
                          </div>
                          <div>
                            <Label htmlFor="billingLastName">Last Name</Label>
                            <Input id="billingLastName" placeholder="Doe" />
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="billingAddress">Address</Label>
                          <Input id="billingAddress" placeholder="123 Main Street" />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <Label htmlFor="billingCity">City</Label>
                            <Input id="billingCity" placeholder="Mumbai" />
                          </div>
                          <div>
                            <Label htmlFor="billingState">State</Label>
                            <Input id="billingState" placeholder="Maharashtra" />
                          </div>
                          <div>
                            <Label htmlFor="billingZip">PIN Code</Label>
                            <Input id="billingZip" placeholder="400001" />
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="sticky top-6">
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Cart Items */}
                    <div className="space-y-4">
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
                            <h4 className="font-medium text-gray-900 text-sm">{item.name}</h4>
                            <p className="text-sm text-gray-600">Size: {item.size}</p>
                            <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-[#03312f]">
                              ₹{(item.price * item.quantity * 75).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Separator />

                    {/* Order Totals */}
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="font-medium">₹{(subtotal * 75).toFixed(2)}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-gray-600">Shipping</span>
                        <span className="font-medium">
                          {shipping === 0 ? 'Free' : `₹${(shipping * 75).toFixed(2)}`}
                        </span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tax</span>
                        <span className="font-medium">₹{(tax * 75).toFixed(2)}</span>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span className="text-[#03312f]">₹{(total * 75).toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Place Order Button */}
                    <Button 
                      type="submit"
                      className="w-full bg-[#03312f] hover:bg-[#024a46] text-white font-semibold py-3"
                    >
                      <Lock className="mr-2 h-4 w-4" />
                      {paymentMethod === 'razorpay' ? 'Pay with Razorpay' : 'Place Order (COD)'}
                    </Button>

                    <div className="text-center text-sm text-gray-600">
                      <p className="flex items-center justify-center gap-1">
                        <Lock className="h-3 w-3" />
                        Secure checkout powered by SSL encryption
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}