"use client";

import { useEffect, useState } from "react";
import { fetchCategories } from "@/lib/api/categories";
import { fetchProducts } from "@/lib/api/products";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import FilterSidebar from "@/app/products/FilterSidebar";
import ProductsGrid from "@/app/products/ProductsGrid";
import Pagination from "@/app/products/Pagination";
import { Product } from "@/types/product";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Filter,
  Grid,
  List,
  ChevronDown,
  Star,
  Heart,
  ShoppingCart,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 12;
  const brands = ["PlantPro", "GreenThumb", "EcoPlants", "BotanicCo"];

  useEffect(() => {
    const load = async () => {
      const [prods, cats] = await Promise.all([
        fetchProducts(),
        fetchCategories(),
      ]);
      setProducts(prods);
      setCategories(cats.map((c) => c.name));
    };
    load();
  }, []);

  const filtered = products.filter((p) => {
    const price = parseFloat(p.price);
    const inPrice = price >= priceRange[0] && price <= priceRange[1];
    const inCat =
      selectedCategories.length === 0 ||
      selectedCategories.includes(p.category.name);
    const inBrand =
      selectedBrands.length === 0 || selectedBrands.includes(p.brand);
    return inPrice && inCat && inBrand;
  });

  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const addToWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">All Plants</h1>
          <p className="text-gray-600">
            Discover our complete collection of premium plants and botanical
            accessories
          </p>
        </div>

        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <Card>
              <CardContent className="p-6">
                <h2 className="font-semibold text-gray-900 mb-4">Filters</h2>
                <FilterSidebar
                  categories={categories}
                  brands={brands}
                  priceRange={priceRange}
                  selectedCategories={selectedCategories}
                  selectedBrands={selectedBrands}
                  onPriceChange={setPriceRange}
                  onCategoryChange={setSelectedCategories}
                  onBrandChange={setSelectedBrands}
                />
              </CardContent>
            </Card>
          </div>

          {/* Main content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex items-center gap-4">
                {/* Mobile Filter */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden">
                      <Filter className="h-4 w-4 mr-2" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                      <SheetDescription>
                        Refine your plant search
                      </SheetDescription>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterSidebar
                        categories={categories}
                        brands={brands}
                        priceRange={priceRange}
                        selectedCategories={selectedCategories}
                        selectedBrands={selectedBrands}
                        onPriceChange={setPriceRange}
                        onCategoryChange={setSelectedCategories}
                        onBrandChange={setSelectedBrands}
                      />
                    </div>
                  </SheetContent>
                </Sheet>

                <span className="text-sm text-gray-600">
                  Showing {paginated.length} of {filtered.length} products
                </span>
              </div>

              <div className="flex items-center gap-4">
                {/* Sort */}
                <Select defaultValue="featured">
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price-high">
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value="rating">Customer Rating</SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                  </SelectContent>
                </Select>

                {/* View Mode */}
                <div className="flex border rounded-md">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products */}
            <ProductsGrid
              products={paginated}
              viewMode={viewMode}
              wishlist={wishlist}
              addToWishlist={addToWishlist}
            />

            {/* Pagination */}
            <div className="mt-8">
              <Pagination
                totalPages={Math.ceil(filtered.length / itemsPerPage)}
                currentPage={currentPage}
                onChange={setCurrentPage}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
