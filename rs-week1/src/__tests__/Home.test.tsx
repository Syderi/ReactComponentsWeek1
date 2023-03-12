import React from 'react';
import Home from '../components/pages/Home';
import { describe, test, expect } from 'vitest';
import { render, waitFor, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

describe('<Home />', () => {
  test('Home page', async () => {
    const { findByText, queryByText } = render(
      <MemoryRouter>
        <Home searchTerm="" />
      </MemoryRouter>
    );

    const loading = await findByText(/Loading/i);
    expect(loading).not.toBeNull();

    await waitFor(() => expect(queryByText(/Loading/i)).toBeNull());
  });

  test('renders the list of products when loaded', async () => {
    const { queryByText } = render(
      <MemoryRouter>
        <Home searchTerm="" />
      </MemoryRouter>
    );

    await waitFor(() => expect(queryByText(/Loading/i)).toBeNull());

    const product1 = screen.getByTestId('product-card1');
    const product2 = screen.getByTestId('product-card2');

    expect(product1).not.toBeNull();
    expect(product2).to.exist;
  });
});
