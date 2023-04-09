import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import ProductCard from '../components/pages/ProductCard/ProductCard';

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

  test('renders without crashing', () => {
    render(<ProductCard product={mockProduct} />);
  });

  test('renders product details correctly', () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
    expect(
      screen.getByText(
        `Price: $${mockProduct.price - (mockProduct.price * mockProduct.discountPercentage) / 100}`
      )
    ).toBeInTheDocument();
    expect(screen.getByText(`Brand: ${mockProduct.brand}`)).toBeInTheDocument();
  });

  test('calls handleShowModal when clicking show button', async () => {
    render(
      <Provider store={store}>
        <ProductCard product={mockProduct} />
      </Provider>
    );
    const showModalButton = screen.getByRole('button');
    fireEvent.click(showModalButton);

    await waitFor(() => {
      const divModal = screen.getByTestId('modal');
      expect(divModal).toBeInTheDocument();
    });
  });
});
