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

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  // Get cart + wishlist counts
  const cartCount = useSelector((state: RootState) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );
  const wishlistCount = useSelector(
    (state: RootState) => state.wishlist.items.length
  );

  // Auth state
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );
 
  const handleLogout = () => {
    dispatch(logout());
    router.push("/auth/login");
  };

  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="w-full">
        <div className="flex h-25 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/IMG-20250615-WA0005-removebg-preview.png"
              alt="Wild Buds Botanics"
              width={300}
              height={150}
              className="object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-lg font-medium hover:text-[#03312f]">
              Home
            </Link>
            <Link
              href="/products"
              className="text-lg font-medium hover:text-[#03312f]"
            >
              Products
            </Link>
            <Link
              href="/categories"
              className="text-lg font-medium hover:text-[#03312f]"
            >
              Categories
            </Link>
            <Link
              href="/about"
              className="text-lg font-medium hover:text-[#03312f]"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-lg font-medium hover:text-[#03312f]"
            >
              Contact
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-sm">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search plants..."
                className="pl-10 pr-4 w-full border-gray-200 focus:border-[#03312f] focus:ring-[#03312f]/20"
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
                className="relative hover:bg-[#03312f]/10"
              >
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-[#03312f] text-xs">
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
                className="relative hover:bg-[#03312f]/10"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-[#03312f] text-xs">
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Auth Section */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hover:bg-[#03312f]/10"
                  >
                    <User className="h-5 w-5 mr-1" />
                    <span>{user?.username}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem>
                    <Link href="/profile">My Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/orders">My Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/wishlist">Wishlist</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/admin">Admin Dashboard</Link>
                  </DropdownMenuItem>
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
                  className="bg-[#03312f] hover:bg-[#024a46] text-white"
                >
                  Sign In
                </Button>
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-white py-4">
            <div className="flex flex-col space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search plants..."
                  className="pl-10 pr-4 w-full border-gray-200 focus:border-[#03312f] focus:ring-[#03312f]/20"
                />
              </div>
              <nav className="flex flex-col space-y-2">
                <Link
                  href="/"
                  className="text-lg font-medium p-2 hover:bg-[#03312f]/10 rounded-md"
                >
                  Home
                </Link>
                <Link
                  href="/products"
                  className="text-lg font-medium p-2 hover:bg-[#03312f]/10 rounded-md"
                >
                  Products
                </Link>
                <Link
                  href="/categories"
                  className="text-lg font-medium p-2 hover:bg-[#03312f]/10 rounded-md"
                >
                  Categories
                </Link>
                <Link
                  href="/about"
                  className="text-lg font-medium p-2 hover:bg-[#03312f]/10 rounded-md"
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="text-lg font-medium p-2 hover:bg-[#03312f]/10 rounded-md"
                >
                  Contact
                </Link>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
