"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";

const CURRENCY_SYMBOL = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL;

interface Props {
  categories: string[];
  brands: string[];
  priceRange: number[];
  selectedCategories: string[];
  selectedBrands: string[];
  onPriceChange: (range: number[]) => void;
  onCategoryChange: (cat: string[]) => void;
  onBrandChange: (brands: string[]) => void;
}

export default function FilterSidebar({
  categories,
  brands,
  priceRange,
  selectedCategories,
  selectedBrands,
  onPriceChange,
  onCategoryChange,
  onBrandChange,
}: Props) {
  const toggle = (
    selected: string[],
    item: string,
    setSelected: (items: string[]) => void
  ) => {
    setSelected(
      selected.includes(item)
        ? selected.filter((i) => i !== item)
        : [...selected, item]
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Price Range</h3>
        <Slider
          value={priceRange}
          onValueChange={onPriceChange}
          max={500}
          step={10}
          className="mb-2"
        />
        <div className="flex justify-between text-sm text-gray-600">
          <span>{CURRENCY_SYMBOL}{priceRange[0]}</span>
          <span>{CURRENCY_SYMBOL}{priceRange[1]}</span>
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={category}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() =>
                  toggle(selectedCategories, category, onCategoryChange)
                }
              />
              <label
                htmlFor={category}
                className="text-sm text-gray-700 cursor-pointer"
              >
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Brands</h3>
         <div className="space-y-2"></div>
        {brands.map((brand) => (
          <div key={brand} className="flex items-center space-x-2">
            <Checkbox
              id={brand}
              checked={selectedBrands.includes(brand)}
              onCheckedChange={() =>
                toggle(selectedBrands, brand, onBrandChange)
              }
            />
            <label htmlFor={brand} className="text-sm text-gray-700 cursor-pointer">{brand}</label>
          </div>
        ))}
      </div>
    </div>
  );
}
