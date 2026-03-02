import { useEffect, useState } from "react";
import { getProductById } from "../services/product.service";
import { getFavorites } from "../utils/favourites";
import type { Product } from "../types/product.types";

/**
 * Custom hook to fetch all favorite products
 */
export const useFavoriteProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        setLoading(true);
        setError(null);

        const favoriteIds = getFavorites();

        if (!favoriteIds.length) {
          setProducts([]);
          return;
        }

        const results = await Promise.all(
          favoriteIds.map((id) => getProductById(id)),
        );

        setProducts(results);
      } catch {
        setError("Unable to load favorite products.");
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, []);

  return { products, setProducts, loading, error };
};
