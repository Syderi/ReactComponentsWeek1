import React from 'react';
import { render, screen } from '@testing-library/react';
import ModalProductCard from '../components/pages/ProductCard/ModalProductCard';
import { vi } from 'vitest';

describe('ModalProductCard', () => {
  const product = {
    id: 12,
    title: 'Test product',
    description: 'Test description',
    price: 10,
    discountPercentage: 10,
    rating: 4,
    stock: 5,
    brand: 'Test brand',
    category: 'Test category',
    thumbnail: 'https://example.com/test.jpg',
  };
  const closeModal = vi.fn();

  test('renders product details correctly', () => {
    render(<ModalProductCard product={product} closeModal={closeModal} />);

    expect(screen.getByText(product.title)).toBeInTheDocument();
    expect(screen.getByText(product.description)).toBeInTheDocument();
    expect(
      screen.getByText(
        `Price: $${product.price - (product.price * product.discountPercentage) / 100}`
      )
    ).toBeInTheDocument();
    expect(screen.getByText(`Rating: ${product.rating}`)).toBeInTheDocument();
    expect(screen.getByText(`Stock: ${product.stock}`)).toBeInTheDocument();
    expect(screen.getByText(`Brand: ${product.brand}`)).toBeInTheDocument();
    expect(screen.getByText(`Category: ${product.category}`)).toBeInTheDocument();
  });

  test('calls closeModal when clicking close button', () => {
    render(<ModalProductCard product={product} closeModal={closeModal} />);
    const closeButton = screen.getByRole('button');
    closeButton.click();

    expect(closeModal).toHaveBeenCalled();
  });
});
