// src/test/mocks/product.mock.ts
import type { Product } from "../../types/product.types";

export const createMockProduct = (overrides?: Partial<Product>): Product => ({
  id: 1,
  title: "Mock Product",
  description: "Test description",
  price: 100,
  discountPercentage: 10,
  rating: 4.5,
  stock: 20,
  brand: "Test Brand",
  category: "test-category",
  thumbnail: "https://dummyimage.com/200x200",
  images: ["https://dummyimage.com/200x200"],
  ...overrides,
});
