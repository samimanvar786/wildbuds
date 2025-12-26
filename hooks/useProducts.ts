'use client';

import { useEffect, useState } from 'react';
import { fetchProducts, fetchProductById, Product } from '@/lib/api/products';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all products
  const getAllProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (err: any) {
      setError(err.message || 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Fetch single product by ID
  const getProductById = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProductById(id);
      setProduct(data);
    } catch (err: any) {
      setError(err.message || 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Load all products on mount
  useEffect(() => {
    getAllProducts();
  }, []);

  return { products, product, loading, error, getAllProducts, getProductById };
};
