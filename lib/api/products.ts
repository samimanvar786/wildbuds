// lib/api/products.ts
export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
}

export interface ProductImage {
  id: number;
  image: string;
  is_featured: boolean;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  features: string;
  price: string;
  sale_price: string | null;
  category: Category;
  is_featured: boolean;
  images: ProductImage[];
  featured_image: string;
}

export const fetchProducts = async (): Promise<Product[]> => {
  const res = await fetch("http://localhost:8000/api/products", {
    next: { revalidate: 60 }, // optional: ISR cache in Next.js App Router
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();
  return data;
};
