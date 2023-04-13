import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { BASE_URL } from '../store/Api/Api';
import { cleanup } from '@testing-library/react';
import { renderWithProviders } from '../utils/test-utils';
import ModalProductCard from '../components/pages/ProductCard/ModalProductCard';
import React from 'react';
import { vi } from 'vitest';

const mockserver = setupServer(
  rest.get(`${BASE_URL}products/:id`, (req, res, ctx) => {
    const query = Number(req.params.id);
    if (query === 2) {
      return res(
        ctx.status(200),
        ctx.json({
          id: 2,
          title: 'iPhone X',
          description:
            'SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...',
          price: 899,
          discountPercentage: 17.94,
          rating: 4.44,
          stock: 34,
          brand: 'Apple',
          category: 'smartphones',
          thumbnail: 'https://i.dummyjson.com/data/products/2/thumbnail.jpg',
          images: [
            'https://i.dummyjson.com/data/products/2/1.jpg',
            'https://i.dummyjson.com/data/products/2/2.jpg',
            'https://i.dummyjson.com/data/products/2/3.jpg',
            'https://i.dummyjson.com/data/products/2/thumbnail.jpg',
          ],
        })
      );
    } else if (query !== 2) return res(ctx.status(404), ctx.json({ error: 'error' }));
  })
);

beforeAll(() => mockserver.listen());

afterEach(() => {
  mockserver.resetHandlers();
  cleanup();
});

afterAll(() => mockserver.close());

describe('Extended card component', () => {
  const closeModal = vi.fn();

  test('fetch card by id from api', async () => {
    const { findByText } = renderWithProviders(
      <ModalProductCard productID={2} closeModal={closeModal} />
    );

    expect(await findByText('iPhone X')).toBeInTheDocument();
    expect(await findByText('Category: smartphones')).toBeInTheDocument();
    expect(await findByText('Stock: 34')).toBeInTheDocument();
    expect(await findByText('Brand: Apple')).toBeInTheDocument();
  });

  test('should not fetch card by id from api', async () => {
    const { findByText } = renderWithProviders(
      <ModalProductCard productID={3333333} closeModal={closeModal} />
    );
    expect(await findByText('Product not Loading...')).toBeInTheDocument();
  });
});
