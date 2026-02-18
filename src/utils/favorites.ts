const KEY = "favorite_products";

export const getFavorites = (): number[] => {
  const data = localStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
};

export const isFavorite = (id: number): boolean => {
  return getFavorites().includes(id);
};

export const toggleFavorite = (id: number): number[] => {
  let favorites = getFavorites();
  console.log("this method is called with id:", id);
  if (favorites.includes(id)) {
    favorites = favorites.filter((fav) => fav !== id);
  } else {
    favorites.push(id);
  }

  localStorage.setItem(KEY, JSON.stringify(favorites));
  return favorites;
};
