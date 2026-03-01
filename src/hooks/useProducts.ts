// src/hooks/useProducts.ts

import { useEffect, useState } from "react";
import { getProducts } from "../services/product.service";
import type { Product } from "../types/product.types";
import type { ProductResponse } from "../types/api.types";
import { PRODUCT_LIMIT } from "../constants/product.constants";

/**
 * Custom hook to manage product list fetching
 */
export const useProducts = (
  page: number,
  search?: string,
  category?: string,
) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response: ProductResponse = await getProducts({
          page,
          limit: PRODUCT_LIMIT,
          search,
          category,
        });

        setProducts(response.products);
        setTotal(response.total);
      } catch {
        setError("Unable to fetch products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductsData();
  }, [page, search, category]);

  return { products, total, loading, error };
};
