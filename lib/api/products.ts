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


const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const fetchProducts = async (): Promise<Product[]> => {
  const res = await fetch(`${BASE_URL}/products`, {
    next: { revalidate: 60 }, // optional: ISR cache in Next.js App Router
  });
  
  
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();
  console.log("data", data);
  return data;
};


export const fetchProductById = async (slug: string | number): Promise<Product> => {
  const res = await fetch(`${BASE_URL}/products/${slug}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
};