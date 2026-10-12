import { useEffect, useState } from 'react';

/**
 * Returns `value` only after it has stopped changing for `delay` ms.
 * Used to avoid firing an API request on every keystroke.
 */
export const useDebounce = <T>(value: T, delay: number = 400): T => {
  const [debounced, setDebounced] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);

    // Cleanup: if `value` changes again before the timer fires, cancel it
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
};
