export interface Category {
  id: number;
  name: string;
}

export type CareInstructions = {
  light: string;
  water: string;
  humidity: string;
  temperature: string;
  fertilizer: string;
};

export interface Product {
  id: number;
  name: string;
  price: string;
  originalPrice?: string | null;
  rating: number;
  reviews: number;
  image: string;
  category: Category;
  brand: string;
  inStock: boolean;
  badge?: string;
  featured_image: string;
  in_stock: boolean; // Used in ProductCard
  slug: string;
  size: string;
  description: string;
  careInstructions: CareInstructions;
  sku?: string;
  weight: number;
  images: string;
  createdAt?: string;
  updatedAt?: string;
}
