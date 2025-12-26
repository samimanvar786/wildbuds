"use client";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import LoginForm from "@/app/auth/login/LoginForm";
import SignupForm from "@/app/auth/login/SignupForm";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const fromCheckout = searchParams.get("from") === "checkout";

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            {fromCheckout && (
              <div className="flex items-center justify-center gap-2 mb-4">
                <ShoppingCart className="h-5 w-5 text-[#03312f]" />
                <span className="text-sm text-gray-600">Complete your order</span>
              </div>
            )}
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {fromCheckout ? "Sign in to Continue" : "Sign in to your account"}
            </h1>
            {/* <p className="text-gray-600">
              {fromCheckout
                ? "Sign in or create a new account to complete your purchase"
                : "Sign in to your account"}
            </p> */}
          </div>

          <Separator className="mb-6" />

          <Tabs defaultValue="login">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Create Account</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <Card>
                <CardHeader><CardTitle>Sign In</CardTitle></CardHeader>
                <CardContent><LoginForm /></CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="signup">
              <Card>
                <CardHeader><CardTitle>Create Account</CardTitle></CardHeader>
                <CardContent><SignupForm /></CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {fromCheckout && (
            <div className="text-center mt-6">
              <Link href="/cart">
                <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to Cart
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
