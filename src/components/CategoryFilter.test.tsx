import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import CategoryFilter from './CategoryFilter';
import { getCategories } from '../services/product.service';

vi.mock('../services/product.service', () => ({
  getCategories: vi.fn(),
}));

// The dropdown is disabled while categories load, so wait until it's enabled.
const waitForLoaded = () =>
  waitFor(() =>
    expect(screen.getByLabelText(/select category/i)).not.toHaveAttribute(
      'aria-disabled',
      'true'
    )
  );

describe('CategoryFilter', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without crashing', async () => {
    vi.mocked(getCategories).mockResolvedValue([]);

    render(<CategoryFilter value="" onChange={() => {}} />);

    expect(screen.getByLabelText(/select category/i)).toBeInTheDocument();
    await waitForLoaded();
  });

  it('calls getCategories on mount', async () => {
    vi.mocked(getCategories).mockResolvedValue(['electronics']);

    render(<CategoryFilter value="" onChange={() => {}} />);

    await waitForLoaded();
    expect(getCategories).toHaveBeenCalledTimes(1);
  });

  it('handles fetch error gracefully', async () => {
    vi.mocked(getCategories).mockRejectedValue(new Error('Failed'));

    render(<CategoryFilter value="" onChange={() => {}} />);

    await waitForLoaded();
    expect(getCategories).toHaveBeenCalledTimes(1);
  });
});
