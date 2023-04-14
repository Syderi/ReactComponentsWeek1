import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../pages/Header';
import { MemoryRouter } from 'react-router';

test('should render the component with the correct namePageTerm prop', () => {
  render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );

  expect(screen.getByText(`Current Page: Home`)).toBeTruthy();
});

test('should render the correct navigation links', () => {
  render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );

  const homeLink = screen.getByRole('link', { name: /Home Page/i });
  const aboutLink = screen.getByRole('link', { name: /About US/i });

  expect(homeLink.getAttribute('href')).toBe('/');
  expect(aboutLink.getAttribute('href')).toBe('/about');
});
