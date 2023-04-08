import React from 'react';
import { render } from '@testing-library/react';
import FormPage from '../components/pages/FormPage/FormPage';

test('renders Form page header', () => {
  const { getByText } = render(<FormPage onChangeNamePage={() => {}} />);
  const headerElement = getByText(/Form page/i);
  expect(headerElement).toBeInTheDocument();
});
