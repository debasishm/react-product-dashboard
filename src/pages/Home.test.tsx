import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Home from "./Home";
import * as hook from "../hooks/useProducts";
import type { Product } from "../types/product.types";

describe("Home page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading state", () => {
    vi.spyOn(hook, "useProducts").mockReturnValue({
      products: [] as Product[],
      total: 0,
      loading: true,
      error: null,
    });

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("shows error message", () => {
    vi.spyOn(hook, "useProducts").mockReturnValue({
      products: [] as Product[],
      total: 0,
      loading: false,
      error: "Error",
    });

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    expect(screen.getByText(/error/i)).toBeInTheDocument();
  });

  it("renders product title", () => {
    vi.spyOn(hook, "useProducts").mockReturnValue({
      products: [
        {
          id: 1,
          title: "Test Product",
          price: 100,
          description: "",
          discountPercentage: 0,
          rating: 0,
          stock: 0,
          brand: "",
          category: "",
          thumbnail: "",
          images: [],
        },
      ],
      total: 1,
      loading: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    expect(screen.getByText("Test Product")).toBeInTheDocument();
  });
});
