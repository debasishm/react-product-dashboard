// src/types/api.types.ts

import type { Product } from "./product.types";

/**
 * API response structure for paginated products
 */
export interface ProductResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
