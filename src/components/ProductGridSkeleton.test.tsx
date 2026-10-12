import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ProductGridSkeleton from './ProductGridSkeleton';

describe('ProductGridSkeleton', () => {
  it('announces the loading state to assistive technology', () => {
    render(<ProductGridSkeleton />);

    expect(
      screen.getByRole('status', { name: /loading products/i })
    ).toBeInTheDocument();
  });

  it('renders the requested number of placeholder cards', () => {
    const { container } = render(<ProductGridSkeleton count={3} />);

    expect(container.querySelectorAll('.product-card')).toHaveLength(3);
  });
});
