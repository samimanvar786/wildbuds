"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { loginUser } from "@/lib/api/users";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setCredentials } from "@/store/authSlice";
import { toast } from "sonner";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";
  const fromCheckout = searchParams.get("from") === "checkout";

  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  console.log("isAuthenticated", isAuthenticated);
  
  // 🔥 auto redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, router, redirectTo]);

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const dispatch = useDispatch();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await loginUser(form.email, form.password);

      dispatch(
        setCredentials({
          user: res.user,
          access: res.access,
          refresh: res.refresh,
        })
      );

      toast.success("Login successful!");

      // redirect logic
      if (fromCheckout) {
        router.push("/checkout?step=payment");
      } else {
        router.push(redirectTo);
      }

    } catch (err: any) {
      toast.error(err.error || err.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* EMAIL */}
      <div className="space-y-2">
        <Label htmlFor="loginEmail">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            id="loginEmail"
            type="email"
            placeholder="john@example.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="pl-10"
            required
          />
        </div>
      </div>

      {/* PASSWORD */}
      <div className="space-y-2">
        <Label htmlFor="loginPassword">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            id="loginPassword"
            type={showPassword ? "text" : "password"}
            placeholder="Your password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="pl-10 pr-10"
            required
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* REMEMBER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="remember"
            checked={form.remember}
            onCheckedChange={(checked) =>
              setForm({ ...form, remember: !!checked })
            }
          />
          <Label htmlFor="remember" className="text-sm">
            Remember me
          </Label>
        </div>
        <Link href="/auth/forgot-password" className="text-sm text-[#03312f] hover:underline">
          Forgot password?
        </Link>
      </div>

      {/* SUBMIT */}
      <Button type="submit" className="w-full bg-[#03312f]" disabled={isLoading}>
        {isLoading ? "Signing in..." : "Sign In"}
      </Button>
    </form>
  );
}
