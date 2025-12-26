export interface CartItem {
  id: number;
  name: string;
  price: number | string;
  quantity: number;
  size?: string;
  featured_image: string;
}