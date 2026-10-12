import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useDebounce } from './useDebounce';

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns the initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('a', 300));

    expect(result.current).toBe('a');
  });

  it('only updates after the delay has passed', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: 'a' } }
    );

    rerender({ value: 'ab' });

    act(() => {
      vi.advanceTimersByTime(299);
    });
    expect(result.current).toBe('a'); // not yet

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(result.current).toBe('ab'); // now
  });
});
