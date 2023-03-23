import { describe, test, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import About from '../components/pages/About';
import { fn } from 'jest-mock';

describe('<About />', () => {
  test('About mounts properly', () => {
    const onChangeNamePage = fn();
    const wrapper = render(<About onChangeNamePage={onChangeNamePage} />);
    expect(wrapper).toBeTruthy();

    const h3 = wrapper.container.querySelector('h3');
    expect(h3?.textContent).toMatch(/about/i);
  });
});
