const priceFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

/**
 * Format a price consistently across the app (DummyJSON prices are in USD)
 */
export const formatPrice = (value: number): string =>
  priceFormatter.format(value);
