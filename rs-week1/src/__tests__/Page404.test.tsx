import { describe, test, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import Page404 from '../pages/Page404/Page404';

describe('<Page404 />', () => {
  test('Page404 mounts properly', () => {
    const wrapper = render(<Page404 />);
    expect(wrapper).toBeTruthy();

    const h3 = wrapper.container.querySelector('h3');
    expect(h3?.textContent).toMatch(/404/i);
  });
});
