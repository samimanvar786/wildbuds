"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { registerUser, loginUser } from "@/lib/api/users";

export default function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";
  const fromCheckout = searchParams.get("from") === "checkout";

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
    agree: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleChange(name: string, value: string | boolean) {
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function validate() {
    const newErrors: Record<string, string> = {};

    if (!form.username) newErrors.username = "Username is required";
    if (!form.email) newErrors.email = "Email is required";
    if (!form.password) newErrors.password = "Password is required";
    if (form.password !== form.confirm)
      newErrors.confirm = "Passwords do not match";
    if (!form.agree) newErrors.agree = "You must agree to terms";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);

    try {
      await registerUser({
        username: form.username,
        email: form.email,
        password: form.password,
      });

      // auto-login after register
      const auth = await loginUser(form.email, form.password);
      console.log("auth login",auth);
      
      localStorage.setItem("auth", JSON.stringify(auth));

      router.push(fromCheckout ? "/checkout?step=payment" : redirectTo);
    } catch (err) {
      alert((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      {/* USERNAME */}
      <div>
        <Label>Username *</Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            className="pl-10"
            value={form.username}
            onChange={(e) => handleChange("username", e.target.value)}
          />
        </div>
        {errors.username && <p className="text-red-500">{errors.username}</p>}
      </div>

      {/* EMAIL */}
      <div>
        <Label>Email *</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            className="pl-10"
            type="email"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </div>
        {errors.email && <p className="text-red-500">{errors.email}</p>}
      </div>

      {/* PASSWORD */}
      <div>
        <Label>Password *</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            className="pl-10 pr-10"
            type={showPassword ? "text" : "password"}
            value={form.password}
            onChange={(e) => handleChange("password", e.target.value)}
          />
          <Button
            type="button"
            variant="ghost"
            className="absolute right-0 top-0 h-full"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </Button>
        </div>
        {errors.password && <p className="text-red-500">{errors.password}</p>}
      </div>

      {/* CONFIRM */}
      <div>
        <Label>Confirm Password *</Label>
        <Input
          type={showConfirm ? "text" : "password"}
          value={form.confirm}
          onChange={(e) => handleChange("confirm", e.target.value)}
        />
        {errors.confirm && <p className="text-red-500">{errors.confirm}</p>}
      </div>

      {/* TERMS */}
      <div className="flex items-center space-x-2">
        <Checkbox
          checked={form.agree}
          onCheckedChange={(checked) => handleChange("agree", !!checked)}
        />
        <Label>
          I agree to{" "}
          <Link href="/terms" className="underline">
            Terms
          </Link>{" "}
          &{" "}
          <Link href="/privacy" className="underline">
            Privacy Policy
          </Link>
        </Label>
      </div>
      {errors.agree && <p className="text-red-500">{errors.agree}</p>}

      <Button disabled={isLoading} className="w-full bg-[#03312f]">
        {isLoading ? "Creating..." : "Create Account"}
      </Button>
    </form>
  );
}
