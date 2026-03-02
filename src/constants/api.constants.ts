/**
 * Base API URL from environment
 */
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://dummyjson.com";

/**
 * API Endpoints
 */
export const API_ENDPOINTS = {
  PRODUCTS: "/products",
  PRODUCT_SEARCH: "/products/search",
  PRODUCT_BY_ID: (id: string | number) => `/products/${id}`,
  PRODUCT_BY_CATEGORY: (category: string) => `/products/category/${category}`,
  PRODUCT_CATEGORIES: "/products/categories",
};
