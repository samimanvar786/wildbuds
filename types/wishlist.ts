export interface WishlistItem {
  id: number;
  name: string;
  price: string;
  originalPrice: string | null;
  rating: number;
  reviews: number;
  image: string;
  inStock: boolean;
  badge: string;
  dateAdded: string;
  featured_image: string;
  slug: string;
  in_stock: number;
  weight?: number;

}
