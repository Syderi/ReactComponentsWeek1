import { describe, test, expect } from 'vitest';
import React from 'react';
import Home from '../components/pages/Home';
import { render, fireEvent, screen } from '@testing-library/react';
import { fn } from 'jest-mock';
import '@testing-library/jest-dom'; // import the jest-dom library

describe('<Home />', () => {
  test('handles search input change and form submission', () => {
    const onChangeNamePage = fn();
    const { getByPlaceholderText } = render(<Home onChangeNamePage={onChangeNamePage} />);
    const searchInput = getByPlaceholderText('Search...') as HTMLInputElement;
    expect(searchInput).toBeTruthy();

    const searchButton = screen.getByTestId('search-button');
    expect(searchButton).toBeInTheDocument();

    fireEvent.change(searchInput, { target: { value: 'test' } });
    expect(searchInput.value).toBe('test');

    expect(onChangeNamePage).toHaveBeenCalledTimes(1);
  });
});
