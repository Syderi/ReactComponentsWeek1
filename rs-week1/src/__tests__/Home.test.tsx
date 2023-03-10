import { describe, test, expect } from 'vitest';
import React from 'react';
import Home from '../components/pages/Home';
import { render, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

describe('<Home />', () => {
  test('Home page', async () => {
    const { getByText, queryByText } = render(
      <BrowserRouter>
        <Home searchTerm="" />
      </BrowserRouter>
    );

    const loading = getByText(/Loading/i);
    expect(loading).not.toBeNull();

    await waitFor(() => expect(queryByText(/Loading/i)).toBeNull());
  });
});
