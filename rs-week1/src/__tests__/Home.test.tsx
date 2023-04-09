import { describe, test, expect } from 'vitest';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import Home from '../components/pages/Home';
import { render, fireEvent, screen } from '@testing-library/react';
import { fn } from 'jest-mock';

describe('<Home />', () => {
  test('handles search input change and form submission', () => {
    const onChangeNamePage = fn();
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <Home onChangeNamePage={onChangeNamePage} />
      </Provider>
    );
    const searchInput = getByPlaceholderText('Search...') as HTMLInputElement;
    expect(searchInput).toBeInTheDocument();

    const searchButton = screen.getByTestId('search-button');
    expect(searchButton).toBeInTheDocument();

    fireEvent.change(searchInput, { target: { value: 'test' } });
    expect(searchInput.value).toBe('test');

    expect(onChangeNamePage).toHaveBeenCalledTimes(1);
  });
});
