import React from 'react';
import Home from '../components/pages/Home';
import { describe, test, expect } from 'vitest';
import { render, waitFor, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { fn } from 'jest-mock';

describe('<Home />', () => {
  test('Home page', () => {
    const onChangeNamePage = fn();
    const { queryByText } = render(
      <MemoryRouter>
        <Home searchTerm="" onChangeNamePage={onChangeNamePage} />
      </MemoryRouter>
    );

    const loading = queryByText(/Loading/i);
    expect(loading).not.toBeNull();

    waitFor(() => expect(queryByText(/Loading/i)).toBeNull());
  });

  test('renders the list of products when loaded', async () => {
    const onChangeNamePage = fn();
    const { queryByText } = render(
      <MemoryRouter>
        <Home searchTerm="" onChangeNamePage={onChangeNamePage} />
      </MemoryRouter>
    );

    await waitFor(() => expect(queryByText(/Loading/i)).toBeNull());

    const product1 = screen.getByTestId('product-card1');
    const product2 = screen.getByTestId('product-card2');

    expect(product1).not.toBeNull();
    expect(product2).to.exist;
  });
});
