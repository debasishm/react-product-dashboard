import { describe, it, expect, beforeEach } from 'vitest';
import { getFavorites, toggleFavorite } from './favourites';
import { STORAGE_KEY } from '../constants/text.constants';

describe('favourites utility', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns empty array if no favorites stored', () => {
    expect(getFavorites()).toEqual([]);
  });

  it('adds item to favorites', () => {
    const result = toggleFavorite(1);
    expect(result).toContain(1);
  });

  it('removes item if already in favorites', () => {
    toggleFavorite(1);
    const result = toggleFavorite(1);
    expect(result).not.toContain(1);
  });

  it('recovers from corrupted storage data', () => {
    localStorage.setItem(STORAGE_KEY, '{not valid json');

    expect(getFavorites()).toEqual([]);
  });

  it('ignores stored values that are not numbers', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([1, 'x', null, 2]));

    expect(getFavorites()).toEqual([1, 2]);
  });
});
