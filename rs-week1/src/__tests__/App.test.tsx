import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import App from '../App';
import React from 'react';
import { afterEach } from 'vitest';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { BrowserRouter } from 'react-router-dom';

afterEach(() => {
  cleanup();
});

describe('App component', () => {
  it('should display current page', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
      { wrapper: BrowserRouter }
    );

    const linkAbout = screen.getByText(/About US/);
    expect(linkAbout).toBeInTheDocument();

    fireEvent.click(linkAbout);

    const divAbout = screen.getByText('About Us page');
    expect(divAbout).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('home'));

    expect(divAbout).not.toBeInTheDocument();
  });
});
