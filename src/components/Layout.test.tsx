import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";

describe("Layout", () => {
  it("renders Header and Outlet content", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<div>Test Page</div>} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );

    // Header title
    expect(screen.getByText("Product Dashboard")).toBeInTheDocument();

    // Outlet content
    expect(screen.getByText("Test Page")).toBeInTheDocument();
  });
});
