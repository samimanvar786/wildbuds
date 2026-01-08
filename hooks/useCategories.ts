// hooks/useCategories.ts
'use client';

import { useEffect, useState } from "react";
import { fetchCategories, Category } from "@/lib/api/categories";

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadCategories = async () => {
      try {
        setLoading(true);
        const data = await fetchCategories();
        if (isMounted) {
          setCategories(data);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err.message || "Failed to load categories");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadCategories();

    return () => {
      isMounted = false;
    };
  }, []);

  return { categories, loading, error };
}
