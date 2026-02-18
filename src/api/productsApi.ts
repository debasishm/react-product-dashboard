import axios from "axios";
import type { Product } from "../types/product";
import type { Category } from "../types/category";

const API = "https://dummyjson.com";

interface ProductResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export const fetchProducts = async ({
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

  let url = `${API}/products?limit=${limit}&skip=${skip}`;

  if (search && search.trim() !== "") {
    url = `${API}/products/search?q=${encodeURIComponent(
      search,
    )}&limit=${limit}&skip=${skip}`;
  } else if (category && category !== "") {
    url = `${API}/products/category/${category}?limit=${limit}&skip=${skip}`;
  }

  console.log("API CALL:", url);

  const res = await axios.get(url);
  return res.data;
};

export async function fetchCategories(): Promise<string[]> {
  const res = await axios.get("https://dummyjson.com/products/categories");

  // ✅ If API returns objects, map them
  return res.data.map((cat: any) => cat.slug);
}
