import { describe, it, expect, vi } from "vitest";
import {
  getProducts,
  getCategories,
  getProductById,
  getAllProducts,
} from "./product.service";
import { apiClient } from "./api.service";

vi.mock("./api.service", () => ({
  apiClient: {
    get: vi.fn(),
  },
}));

describe("product.service", () => {
  it("calls default products API", async () => {
    const mockData = { products: [], total: 0, skip: 0, limit: 10 };

    vi.mocked(apiClient.get).mockResolvedValue({ data: mockData });

    const result = await getProducts({ page: 1, limit: 10 });

    expect(result).toEqual(mockData);
  });

  it("calls search API when search is provided", async () => {
    const mockData = { products: [], total: 0, skip: 0, limit: 10 };

    vi.mocked(apiClient.get).mockResolvedValue({ data: mockData });

    await getProducts({ page: 1, limit: 10, search: "phone" });

    expect(apiClient.get).toHaveBeenCalled();
  });

  it("calls category API when category is provided", async () => {
    const mockData = { products: [], total: 0, skip: 0, limit: 10 };

    vi.mocked(apiClient.get).mockResolvedValue({ data: mockData });

    await getProducts({ page: 1, limit: 10, category: "electronics" });

    expect(apiClient.get).toHaveBeenCalled();
  });

  it("gets categories", async () => {
    vi.mocked(apiClient.get).mockResolvedValue({
      data: ["electronics", "clothing"],
    });

    const result = await getCategories();

    expect(result).toEqual(["electronics", "clothing"]);
  });

  it("gets product by id", async () => {
    vi.mocked(apiClient.get).mockResolvedValue({
      data: { id: 1, title: "Test" },
    });

    const result = await getProductById(1);

    expect(result).toEqual({ id: 1, title: "Test" });
  });

  it("gets all products", async () => {
    vi.mocked(apiClient.get).mockResolvedValue({
      data: { products: [{ id: 1 }] },
    });

    const result = await getAllProducts();

    expect(result).toEqual([{ id: 1 }]);
  });
});
