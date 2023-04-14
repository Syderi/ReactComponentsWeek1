import React from 'react';
import { render } from '@testing-library/react';
import FormCard from '../pages/formPage/FormCard';

const mockProductCard = {
  id: Date.now(),
  title: 'Product title',
  description: 'Product description',
  price: 9.99,
  date: '2022-03-18',
  productStatus: 'used',
  category: 'smartphones',
  imageUrl: 'https://example.com/image.jpg',
};

test('renders product title and category', () => {
  const { getByText } = render(<FormCard product={mockProductCard} />);
  const titleElement = getByText(/Product title/i);
  const categoryElement = getByText(/Category: smartphones/i);
  expect(titleElement).toBeInTheDocument();
  expect(categoryElement).toBeInTheDocument();
});
