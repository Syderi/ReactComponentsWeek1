import { describe, test, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import Page404 from '../components/pages/Page404';
import { fn } from 'jest-mock';

describe('<Page404 />', () => {
  test('Page404 mounts properly', () => {
    const onChangeNamePage = fn();
    const wrapper = render(<Page404 onChangeNamePage={onChangeNamePage} />);
    expect(wrapper).toBeTruthy();

    // Get by h3
    const h3 = wrapper.container.querySelector('h3');
    expect(h3?.textContent).toMatch(/404/i);
  });
});
