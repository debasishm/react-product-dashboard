import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ImageWithSkeleton from './ImageWithSkeleton';

describe('ImageWithSkeleton', () => {
  it('shows a skeleton until the image has loaded', () => {
    const { container } = render(
      <ImageWithSkeleton src="a.png" alt="Product" height={100} />
    );

    expect(container.querySelector('.MuiSkeleton-root')).toBeInTheDocument();

    fireEvent.load(screen.getByRole('img', { name: 'Product' }));

    expect(
      container.querySelector('.MuiSkeleton-root')
    ).not.toBeInTheDocument();
  });

  it('shows a fallback icon when the image fails to load', () => {
    render(<ImageWithSkeleton src="broken.png" alt="Product" height={100} />);

    fireEvent.error(screen.getByRole('img', { name: 'Product' }));

    expect(screen.getByTestId('image-fallback')).toBeInTheDocument();
  });

  it('shows the fallback when there is no image url', () => {
    render(<ImageWithSkeleton src="" alt="Product" height={100} />);

    expect(screen.getByTestId('image-fallback')).toBeInTheDocument();
  });
});
