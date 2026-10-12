// src/types/api.types.ts

import type { Product } from './product.types';

/**
 * API response structure for paginated products
 */
export interface ProductResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

/**
 * Query options for fetching a page of products
 */
export interface ProductQueryParams {
  page: number;
  limit: number;
  search?: string;
  category?: string;
}
