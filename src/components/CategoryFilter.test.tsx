import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import CategoryFilter from "./CategoryFilter";
import * as api from "../api/product.api";

vi.mock("../api/productsApi", () => ({
  fetchCategories: vi.fn(),
}));

describe("CategoryFilter", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders without crashing", async () => {
    vi.mocked(api.fetchCategories).mockResolvedValue([]);

    render(<CategoryFilter value="" onChange={() => {}} />);

    expect(screen.getByLabelText(/select category/i)).toBeInTheDocument();
  });

  it("calls fetchCategories on mount", async () => {
    vi.mocked(api.fetchCategories).mockResolvedValue(["electronics"]);

    render(<CategoryFilter value="" onChange={() => {}} />);

    await waitFor(() => {
      expect(api.fetchCategories).toHaveBeenCalled();
    });
  });

  it("handles fetch error gracefully", async () => {
    vi.mocked(api.fetchCategories).mockRejectedValue(new Error("Failed"));

    render(<CategoryFilter value="" onChange={() => {}} />);

    await waitFor(() => {
      expect(api.fetchCategories).toHaveBeenCalled();
    });
  });
});
