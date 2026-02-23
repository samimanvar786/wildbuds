"use client";

import { useState } from "react";
import { Mail, Gift, Truck, Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

// 🌸 Brand colors
const LEFT_COLOR = "#F4B6C2";
const CENTER_COLOR = "#D86A8C";
const RIGHT_COLOR = "#F2C94C";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const benefits = [
    {
      icon: <Truck className="h-6 w-6" />,
      title: "Free Delivery",
      description: "On orders over $75",
    },
    {
      icon: <Gift className="h-6 w-6" />,
      title: "Plant Care Guide",
      description: "Expert tips included",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Plant Guarantee",
      description: "30-day healthy guarantee",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "24/7 Support",
      description: "Plant care assistance",
    },
  ];

  return (
    <section
      className="py-16"
      style={{
        background: `linear-gradient(
          135deg,
          ${LEFT_COLOR} 10%,
          ${CENTER_COLOR} 45%,
          ${RIGHT_COLOR} 100%
        )`,
      }}
    >
      <div className="container mx-auto px-4">
        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          {benefits.map((benefit, index) => (
            <Card
              key={index}
              className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <CardContent className="p-6 text-center">
                <div className="text-white mb-4 flex justify-center">
                  {benefit.icon}
                </div>
                <h3 className="text-white font-semibold mb-2">
                  {benefit.title}
                </h3>
                <p className="text-white/80 text-sm">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Newsletter */}
        <div className="text-center">
          <div className="max-w-2xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-full p-4">
                <Mail className="h-8 w-8 text-white" />
              </div>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Join Our Plant Community
            </h2>

            <p className="text-white/90 text-lg mb-8">
              Subscribe to our newsletter for exclusive plant care tips, seasonal
              guides, and special offers. Plus, get 15% off your first order!
            </p>

            {isSubscribed ? (
              <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-6 mb-8">
                <h3 className="text-white font-semibold mb-2">
                  Welcome to Wild Buds!
                </h3>
                <p className="text-white/90">
                  Thank you for subscribing. Check your email for your 15%
                  discount code!
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-8"
              >
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/10 border-white/30 text-white placeholder:text-white/60 focus:bg-white/20 focus:border-white/50"
                  required
                />
                <Button
                  type="submit"
                  className="bg-white font-semibold px-8 whitespace-nowrap"
                  style={{ color: CENTER_COLOR }}
                >
                  Subscribe Now
                </Button>
              </form>
            )}

            <p className="text-white/70 text-sm">
              By subscribing, you agree to our{" "}
              <a href="/privacy" className="underline hover:text-white">
                Privacy Policy
              </a>{" "}
              and{" "}
              <a href="/terms" className="underline hover:text-white">
                Terms of Service
              </a>
              . Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}