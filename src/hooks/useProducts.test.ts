import { renderHook, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useProducts } from './useProducts';
import * as productService from '../services/product.service';
import type { ProductResponse } from '../types/api.types';
import { createMockProduct } from '../test/mocks/product.mock';

describe('useProducts hook', () => {
  it('fetches products successfully', async () => {
    const mockResponse = {
      products: [createMockProduct()],
      total: 1,
      skip: 0,
      limit: 10,
    };

    vi.spyOn(productService, 'getProducts').mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useProducts(1));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.products).toHaveLength(1);
    expect(result.current.total).toBe(1);
  });

  it('ignores an outdated response that arrives late', async () => {
    // A promise we resolve by hand, to control when the "slow" request ends
    let resolveFirst!: (value: ProductResponse) => void;
    const slowFirstRequest = new Promise<ProductResponse>(resolve => {
      resolveFirst = resolve;
    });

    const secondResponse: ProductResponse = {
      products: [createMockProduct({ id: 2 })],
      total: 1,
      skip: 10,
      limit: 10,
    };

    vi.spyOn(productService, 'getProducts')
      .mockReturnValueOnce(slowFirstRequest)
      .mockResolvedValueOnce(secondResponse);

    const { result, rerender } = renderHook(({ page }) => useProducts(page), {
      initialProps: { page: 1 },
    });

    rerender({ page: 2 });

    await waitFor(() => {
      expect(result.current.products[0]?.id).toBe(2);
    });

    // The first (outdated) request finally finishes
    await act(async () => {
      resolveFirst({
        products: [createMockProduct({ id: 1 })],
        total: 1,
        skip: 0,
        limit: 10,
      });
    });

    // Page 2's data must still be on screen
    expect(result.current.products[0].id).toBe(2);
  });
});
