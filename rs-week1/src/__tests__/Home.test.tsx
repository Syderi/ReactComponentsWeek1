import { describe, test, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import About from '../components/pages/About';

describe('<About />', () => {
  test('About mounts properly', () => {
    const wrapper = render(<About />);
    expect(wrapper).toBeTruthy();

    // Get by h3
    const h3 = wrapper.container.querySelector('h3');
    expect(h3?.textContent).toBe('About US page');
  });
});
