"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingCart, Heart, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { logout } from "@/store/authSlice";
import { useRouter } from "next/navigation";

const ROSE_PINK = "#D86A8C";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const cartCount = useSelector((state: RootState) =>
    state.cart.items.reduce((t, i) => t + i.quantity, 0)
  );

  const wishlistCount = useSelector(
    (state: RootState) => state.wishlist.items.length
  );

  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  const handleLogout = () => {
    dispatch(logout());
    router.push("/auth/login");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur">
      <div className="w-full">
        <div className="flex h-25 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/IMG-20250615-WA0005-removebg-preview.png"
              alt="Wild Buds Botanics"
              width={300}
              height={150}
              priority
              className="object-contain"
              style={{ height: "150px", width: "300px" }}
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6">
            {["Home", "Products", "Categories", "About", "Contact"].map(
              (label) => (
                <Link
                  key={label}
                  href={`/${label === "Home" ? "" : label.toLowerCase()}`}
                  className="text-lg font-medium transition-colors"
                  style={{ color: "inherit" }}
                >
                  <span className="hover:text-[#D86A8C]">{label}</span>
                </Link>
              )
            )}
          </nav>

          {/* Search */}
          <div className="hidden md:flex items-center flex-1 max-w-sm">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search plants..."
                className="pl-10 pr-4 w-full border-gray-200"
                style={{
                  outlineColor: ROSE_PINK,
                }}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2 mr-4">
            {/* Wishlist */}
            <Link href="/wishlist">
              <Button
                variant="ghost"
                size="sm"
                className="relative"
                style={{ color: ROSE_PINK }}
              >
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <Badge
                    className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs text-white"
                    style={{ backgroundColor: ROSE_PINK }}
                  >
                    {wishlistCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Cart */}
            <Link href="/cart">
              <Button
                variant="ghost"
                size="sm"
                className="relative"
                style={{ color: ROSE_PINK }}
              >
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <Badge
                    className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs text-white"
                    style={{ backgroundColor: ROSE_PINK }}
                  >
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Auth */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    style={{ color: ROSE_PINK }}
                  >
                    <User className="h-5 w-5 mr-1" />
                    {user?.username}
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-56">
                  {[
                    ["My Profile", "/profile"],
                    ["My Orders", "/orders"],
                    ["Wishlist", "/wishlist"],
                    ["Settings", "/settings"],
                    ["Admin Dashboard", "/admin"],
                  ].map(([label, href]) => (
                    <DropdownMenuItem key={href}>
                      <Link href={href}>{label}</Link>
                    </DropdownMenuItem>
                  ))}

                  <DropdownMenuItem
                    className="text-red-600 cursor-pointer"
                    onClick={handleLogout}
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/auth/login">
                <Button
                  size="sm"
                  className="text-white"
                  style={{ backgroundColor: ROSE_PINK }}
                >
                  Sign In
                </Button>
              </Link>
            )}

            {/* Mobile Toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{ color: ROSE_PINK }}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-white py-4">
            <div className="flex flex-col space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search plants..."
                  className="pl-10 pr-4 w-full border-gray-200"
                />
              </div>

              <nav className="flex flex-col space-y-2">
                {["Home", "Products", "Categories", "About", "Contact"].map(
                  (label) => (
                    <Link
                      key={label}
                      href={`/${label === "Home" ? "" : label.toLowerCase()}`}
                      className="text-lg font-medium p-2 rounded-md"
                      style={{ color: ROSE_PINK }}
                    >
                      {label}
                    </Link>
                  )
                )}
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
