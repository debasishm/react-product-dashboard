import { STORAGE_KEY } from "../constants/text.constants";

/**
 * Retrieve favorite product IDs from localStorage
 */
export const getFavorites = (): number[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

/**
 * Check if product is favorite
 */
export const isFavorite = (id: number): boolean => {
  return getFavorites().includes(id);
};

/**
 * Toggle product in favorites
 */
export const toggleFavorite = (id: number): number[] => {
  let favorites = getFavorites();

  favorites = favorites.includes(id)
    ? favorites.filter((fav) => fav !== id)
    : [...favorites, id];

  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));

  return favorites;
};
