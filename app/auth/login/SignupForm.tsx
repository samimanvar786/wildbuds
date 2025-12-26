"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { createUser, loginUser } from "@/lib/api/users";

export default function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";
  const fromCheckout = searchParams.get("from") === "checkout";

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    confirm: "",
    address: "",
    city: "",
    state: "",
    postcode: "",
    agree: false,
    newsletter: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleChange(name: string, value: string | boolean) {
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // clear error on typing
  }

  function validate() {
    const newErrors: Record<string, string> = {};
    if (!form.firstName) newErrors.firstName = "First name is required";
    if (!form.lastName) newErrors.lastName = "Last name is required";
    if (!form.phone) newErrors.phone = "Phone number is required";
    if (!form.email) newErrors.email = "Email is required";
    if (!form.password) newErrors.password = "Password is required";
    if (form.password !== form.confirm)
      newErrors.confirm = "Passwords do not match";
    // if (!form.address) newErrors.address = "Address is required";
    // if (!form.city) newErrors.city = "City is required";
    // if (!form.state) newErrors.state = "State is required";
    // if (!form.postcode) newErrors.postcode = "Postcode is required";
    // if (!form.agree) newErrors.agree = "You must agree to terms";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      await createUser({
        first_name: form.firstName,
        last_name: form.lastName,
        phone: form.phone,
        email: form.email,
        address: form.address,
        city: form.city,
        state: form.state,
        postcode: form.postcode,
        password: form.password,
      });
      // auto login
      const res = await loginUser(form.email, form.password);
      localStorage.setItem("auth", JSON.stringify(res));
      router.push(fromCheckout ? "/checkout?step=payment" : redirectTo);
    } catch (err) {
      alert((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* names */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>First Name *</Label>
          <Input
            value={form.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm">{errors.firstName}</p>
          )}
        </div>
        <div>
          <Label>Last Name *</Label>
          <Input
            value={form.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm">{errors.lastName}</p>
          )}
        </div>
      </div>

      {/* phone */}
      <div>
        <Label>Phone *</Label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="tel"
            placeholder="+91 0000000000"
            value={form.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            className="pl-10"
          />
        </div>
        {errors.phone && (
          <p className="text-red-500 text-sm">{errors.phone}</p>
        )}
      </div>

      {/* email */}
      <div>
        <Label>Email *</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="email"
            placeholder="john@example.com"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="pl-10"
          />
        </div>
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email}</p>
        )}
      </div>

      {/* password */}
      <div>
        <Label>Password *</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type={showPassword ? "text" : "password"}
            value={form.password}
            onChange={(e) => handleChange("password", e.target.value)}
            className="pl-10 pr-10"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
        </div>
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password}</p>
        )}
      </div>

      {/* confirm */}
      <div>
        <Label>Confirm Password *</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type={showConfirm ? "text" : "password"}
            value={form.confirm}
            onChange={(e) => handleChange("confirm", e.target.value)}
            className="pl-10 pr-10"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3"
            onClick={() => setShowConfirm(!showConfirm)}
          >
            {showConfirm ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
        </div>
        {errors.confirm && (
          <p className="text-red-500 text-sm">{errors.confirm}</p>
        )}
      </div>

      {/* address
      <div>
        <Label>Address *</Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            value={form.address}
            onChange={(e) => handleChange("address", e.target.value)}
            className="pl-10"
          />
        </div>
        {errors.address && (
          <p className="text-red-500 text-sm">{errors.address}</p>
        )}
      </div> */}

      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Input
            placeholder="City"
            value={form.city}
            onChange={(e) => handleChange("city", e.target.value)}
          />
          {errors.city && (
            <p className="text-red-500 text-sm">{errors.city}</p>
          )}
        </div>
        <div>
          <Input
            placeholder="State"
            value={form.state}
            onChange={(e) => handleChange("state", e.target.value)}
          />
          {errors.state && (
            <p className="text-red-500 text-sm">{errors.state}</p>
          )}
        </div>
        <div>
          <Input
            placeholder="Postcode"
            value={form.postcode}
            onChange={(e) => handleChange("postcode", e.target.value)}
          />
          {errors.postcode && (
            <p className="text-red-500 text-sm">{errors.postcode}</p>
          )}
        </div>
      </div> */}

      {/* checkboxes */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="agree"
            checked={form.agree}
            onCheckedChange={(checked) => handleChange("agree", !!checked)}
          />
          <Label htmlFor="agree" className="text-sm">
            I agree to the{" "}
            <Link href="/terms" className="text-[#03312f] hover:underline">
              Terms
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-[#03312f] hover:underline">
              Privacy Policy
            </Link>
          </Label>
        </div>
        {errors.agree && (
          <p className="text-red-500 text-sm">{errors.agree}</p>
        )}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="newsletter"
            checked={form.newsletter}
            onCheckedChange={(checked) =>
              handleChange("newsletter", !!checked)
            }
          />
          <Label htmlFor="newsletter" className="text-sm">
            Subscribe to our newsletter
          </Label>
        </div>
      </div>

      <Button type="submit" className="w-full bg-[#03312f]" disabled={isLoading}>
        {isLoading ? "Creating..." : "Create Account"}
      </Button>
    </form>
  );
}
