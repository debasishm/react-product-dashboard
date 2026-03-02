import { describe, it, expect, beforeEach } from "vitest";
import { getFavorites, toggleFavorite } from "./favourites";

describe("favourites utility", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns empty array if no favorites stored", () => {
    expect(getFavorites()).toEqual([]);
  });

  it("adds item to favorites", () => {
    const result = toggleFavorite(1);
    expect(result).toContain(1);
  });

  it("removes item if already in favorites", () => {
    toggleFavorite(1);
    const result = toggleFavorite(1);
    expect(result).not.toContain(1);
  });
});
