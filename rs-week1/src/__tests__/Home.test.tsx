import { describe, test, expect } from 'vitest';
import React from 'react';
import Home from '../components/pages/Home';
import { render, fireEvent } from '@testing-library/react';
import { fn } from 'jest-mock';
import { MemoryRouter } from 'react-router';

describe('<Home />', () => {
  test('handles search input change and form submission', () => {
    const onChangeNamePage = fn();
    const { getByPlaceholderText } = render(
      <MemoryRouter>
        <Home onChangeNamePage={onChangeNamePage} />
      </MemoryRouter>
    );
    const searchInput = getByPlaceholderText('Search...') as HTMLInputElement;
    expect(searchInput).toBeTruthy();

    fireEvent.change(searchInput, { target: { value: 'test' } });
    expect(searchInput.value).toBe('test');

    expect(onChangeNamePage).toHaveBeenCalledTimes(1);
  });
});
