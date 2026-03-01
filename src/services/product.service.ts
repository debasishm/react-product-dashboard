// src/services/product.service.ts

import { apiClient } from "./api.service";
import { API_ENDPOINTS } from "../constants/api.constants";
import type { Product } from "../types/product.types";
import type { ProductResponse } from "../types/api.types";

/**
 * Fetch paginated products with optional search and category filter
 */
export const getProducts = async ({
  page,
  limit,
  search,
  category,
}: {
  page: number;
  limit: number;
  search?: string;
  category?: string;
}): Promise<ProductResponse> => {
  const skip = (page - 1) * limit;

  if (search?.trim()) {
    const response = await apiClient.get<ProductResponse>(
      API_ENDPOINTS.PRODUCT_SEARCH,
      {
        params: {
          q: search,
          limit,
          skip,
        },
      },
    );

    return response.data;
  }

  if (category) {
    const response = await apiClient.get<ProductResponse>(
      API_ENDPOINTS.PRODUCT_BY_CATEGORY(category),
      {
        params: {
          limit,
          skip,
        },
      },
    );

    return response.data;
  }

  const response = await apiClient.get<ProductResponse>(
    API_ENDPOINTS.PRODUCTS,
    {
      params: {
        limit,
        skip,
      },
    },
  );

  return response.data;
};

/**
 * Fetch all product categories
 */
export const getCategories = async (): Promise<string[]> => {
  const response = await apiClient.get<string[]>(
    API_ENDPOINTS.PRODUCT_CATEGORIES,
  );

  return response.data;
};

/**
 * Fetch single product by ID
 */
export const getProductById = async (id: string | number): Promise<Product> => {
  const response = await apiClient.get<Product>(
    API_ENDPOINTS.PRODUCT_BY_ID(id),
  );

  return response.data;
};

/**
 * Fetch all products (non-paginated)
 */
export const getAllProducts = async (
  limit: number = 100,
): Promise<Product[]> => {
  const response = await apiClient.get<ProductResponse>(
    API_ENDPOINTS.PRODUCTS,
    {
      params: { limit },
    },
  );

  return response.data.products;
};
