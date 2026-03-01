import { axiosClient } from "./axiosClient";
import { API_ENDPOINTS } from "../constants/api.constants";
import type { ProductResponse } from "../types/api.types";
import type { Product } from "../types/product.types";

export const fetchProductsApi = async (
  params: Record<string, unknown>,
): Promise<ProductResponse> => {
  const { data } = await axiosClient.get(API_ENDPOINTS.PRODUCTS, { params });
  return data;
};

export const searchProductsApi = async (
  params: Record<string, unknown>,
): Promise<ProductResponse> => {
  const { data } = await axiosClient.get(API_ENDPOINTS.PRODUCT_SEARCH, {
    params,
  });
  return data;
};

export const fetchCategoryProductsApi = async (
  category: string,
  params: Record<string, unknown>,
): Promise<ProductResponse> => {
  const { data } = await axiosClient.get(
    API_ENDPOINTS.PRODUCT_BY_CATEGORY(category),
    { params },
  );
  return data;
};

export const fetchProductByIdApi = async (
  id: string | number,
): Promise<Product> => {
  const { data } = await axiosClient.get(API_ENDPOINTS.PRODUCT_BY_ID(id));
  return data;
};
