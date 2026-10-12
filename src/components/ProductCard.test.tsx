import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import ProductCard from './ProductCard';

describe('ProductCard', () => {
  const mockProduct = {
    id: 1,
    title: 'Test Product',
    description: 'Test description',
    price: 100,
    discountPercentage: 10,
    rating: 4.5,
    stock: 20,
    brand: 'Test Brand',
    category: 'Test Category',
    thumbnail: 'test.jpg',
    images: [],
  };

  it('renders product title', () => {
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} />
      </MemoryRouter>
    );

    expect(screen.getByText('Test Product')).toBeInTheDocument();
  });

  it('renders product price', () => {
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} />
      </MemoryRouter>
    );

    expect(screen.getByText(/100/)).toBeInTheDocument();
  });

  it('renders the formatted price', () => {
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} />
      </MemoryRouter>
    );

    expect(screen.getByText('$100.00')).toBeInTheDocument();
  });

  it('links to the product detail route', () => {
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} />
      </MemoryRouter>
    );

    expect(screen.getByRole('link', { name: 'View' })).toHaveAttribute(
      'href',
      '/products/1'
    );
  });
});
