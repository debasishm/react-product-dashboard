import { STORAGE_KEY } from '../constants/text.constants';

/**
 * Retrieve favorite product IDs from localStorage.
 * Returns an empty list if storage is unavailable or holds invalid data.
 */
export const getFavorites = (): number[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];

    // JSON.parse can return anything, so we declare the shape we expect...
    const parsed: number[] | null = JSON.parse(data);

    // ...and still verify it at runtime, because storage can hold anything
    return Array.isArray(parsed)
      ? parsed.filter(id => typeof id === 'number')
      : [];
  } catch {
    return [];
  }
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
  const current = getFavorites();

  const favorites = current.includes(id)
    ? current.filter(fav => fav !== id)
    : [...current, id];

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error('Unable to save favorites:', error);
  }

  return favorites;
};
