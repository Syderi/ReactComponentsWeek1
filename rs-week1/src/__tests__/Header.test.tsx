import { describe, test, expect } from 'vitest';
import React from 'react';
import Header from '../components/Header';
import { render, fireEvent } from '@testing-library/react';
import { fn } from 'jest-mock';
import { MemoryRouter } from 'react-router';

describe('<Header />', () => {
  test('handles search input change and form submission', () => {
    const onSearch = fn();
    const { getByPlaceholderText, getByText } = render(
      <MemoryRouter>
        <Header onSearch={onSearch} namePageTerm="" />
      </MemoryRouter>
    );
    const searchInput = getByPlaceholderText('Search...') as HTMLInputElement;
    const searchButton = getByText('Search');

    fireEvent.change(searchInput, { target: { value: 'test' } });
    expect(searchInput.value).toBe('test');

    fireEvent.click(searchButton);
    expect(onSearch).toHaveBeenCalledTimes(1);
    expect(onSearch).toHaveBeenCalledWith('test');
  });
});
