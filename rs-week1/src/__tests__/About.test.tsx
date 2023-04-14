import { describe, test, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import About from '../pages/About';

describe('<About />', () => {
  test('About mounts properly', () => {
    const wrapper = render(<About />);
    expect(wrapper).toBeTruthy();

    const h3 = wrapper.container.querySelector('h3');
    expect(h3?.textContent).toMatch(/about/i);
  });
});
