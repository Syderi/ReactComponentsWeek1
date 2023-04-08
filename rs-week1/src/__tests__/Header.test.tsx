import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../components/pages/Header';
import { MemoryRouter } from 'react-router';

test('should render the component with the correct namePageTerm prop', () => {
  const namePageTerm = 'Home Page';
  render(
    <MemoryRouter>
      <Header namePageTerm={namePageTerm} />
    </MemoryRouter>
  );

  expect(screen.getByText(`Current Page: ${namePageTerm}`)).toBeTruthy();
});

test('should render the correct navigation links', () => {
  render(
    <MemoryRouter>
      <Header namePageTerm="Home Page" />
    </MemoryRouter>
  );

  const homeLink = screen.getByRole('link', { name: /Home Page/i });
  const aboutLink = screen.getByRole('link', { name: /About US/i });

  expect(homeLink.getAttribute('href')).toBe('/');
  expect(aboutLink.getAttribute('href')).toBe('/about');
});
