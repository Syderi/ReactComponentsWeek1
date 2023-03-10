import { describe, test, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import Page404 from '../components/pages/Page404';
describe('<Page404 />', () => {
    test('Page404 mounts properly', () => {
        const wrapper = render(React.createElement(Page404, null));
        expect(wrapper).toBeTruthy();
        // Get by h3
        const h3 = wrapper.container.querySelector('h3');
        expect(h3?.textContent).toMatch(/404/i);
    });
});
