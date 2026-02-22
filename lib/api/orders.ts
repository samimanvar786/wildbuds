// lib/api/orders.ts
import { authHeaders } from "../api/authHelper";

export interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string | null;
}

export type OrderStatus = "created" | "paid" | "shipped" | "delivered";

export interface Order {
  id: string;
  date: string;
  status: OrderStatus;
  total: number;
  items: OrderItem[];
  tracking: string | null;
  deliveryDate: string | null;
  estimatedDelivery: string | null;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const fetchOrders = async (): Promise<Order[]> => {
  const res = await fetch(`${BASE_URL}/payments/orders/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(), // ✅ token injected here
    },
    cache: "no-store",
  });

  if (res.status === 401) {
    throw new Error("Unauthorized. Please login again.");
  }

  if (!res.ok) {
    throw new Error("Failed to fetch orders");
  }

  return res.json();
};
