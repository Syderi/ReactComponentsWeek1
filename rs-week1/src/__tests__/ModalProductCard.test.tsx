import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { render, screen, waitFor } from '@testing-library/react';
import ModalProductCard from '../components/pages/ProductCard/ModalProductCard';
import { vi } from 'vitest';

describe('ModalProductCard', () => {
  const closeModal = vi.fn();

  test('renders product details correctly', async () => {
    render(
      <Provider store={store}>
        <ModalProductCard productID={11} closeModal={closeModal} />
      </Provider>
    );

    await waitFor(() => {
      const closeButton = screen.getByRole('button');
      expect(closeButton).toBeInTheDocument();
      closeButton.click();
      expect(closeModal).toHaveBeenCalled();
    });
  });
});
