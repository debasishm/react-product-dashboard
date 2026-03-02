import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { useProducts } from "./useProducts";
import * as productService from "../services/product.service";
import { createMockProduct } from "../test/mocks/product.mock";

describe("useProducts hook", () => {
  it("fetches products successfully", async () => {
    const mockResponse = {
      products: [createMockProduct()],
      total: 1,
      skip: 0,
      limit: 10,
    };

    vi.spyOn(productService, "getProducts").mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useProducts(1));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.products).toHaveLength(1);
    expect(result.current.total).toBe(1);
  });
});
