import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import ModalProductCard from '../components/ProductCard/ModalProductCard';

describe('ModalProductCard', () => {
  const closeModal = vi.fn();
  beforeEach(async () => {
    render(
      <Provider store={store}>
        <ModalProductCard productID={11} closeModal={closeModal} />
      </Provider>
    );
  });

  test('renders product details correctly', async () => {
    const closeButton = await screen.findByRole('button');
    expect(closeButton).toBeInTheDocument();
    await userEvent.click(closeButton);
    expect(closeModal).toHaveBeenCalled();
  });
});
