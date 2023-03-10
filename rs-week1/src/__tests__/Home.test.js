import { describe, test, expect } from 'vitest';
import React from 'react';
import Home from '../components/pages/Home';
import { render, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
describe('<Home />', () => {
    test('Home page', async () => {
        const { getByText, queryByText } = render(React.createElement(BrowserRouter, null,
            React.createElement(Home, { searchTerm: "" })));
        const loading = getByText(/Loading/i);
        expect(loading).not.toBeNull();
        await waitFor(() => expect(queryByText(/Loading/i)).toBeNull());
    });
});
