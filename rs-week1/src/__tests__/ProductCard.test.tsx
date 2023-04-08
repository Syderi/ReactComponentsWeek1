import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import ProductCard from '../components/pages/ProductCard/ProductCard';
import { vi } from 'vitest';

describe('ModalProductCard', () => {
  const mockProduct = {
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
  const handleShowModal = vi.fn();

  test('renders without crashing', () => {
    render(<ProductCard product={mockProduct} handleShowModal={handleShowModal} />);
  });

  test('renders product details correctly', () => {
    render(<ProductCard product={mockProduct} handleShowModal={handleShowModal} />);

    expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
    expect(
      screen.getByText(
        `Price: $${mockProduct.price - (mockProduct.price * mockProduct.discountPercentage) / 100}`
      )
    ).toBeInTheDocument();
    expect(screen.getByText(`Brand: ${mockProduct.brand}`)).toBeInTheDocument();
  });

  test('calls handleShowModal when clicking show button', () => {
    render(<ProductCard product={mockProduct} handleShowModal={handleShowModal} />);
    const showModalButton = screen.getByRole('button');
    fireEvent.click(showModalButton);

    expect(handleShowModal).toHaveBeenCalled();
    expect(handleShowModal).toHaveBeenCalledTimes(1);
  });
});
