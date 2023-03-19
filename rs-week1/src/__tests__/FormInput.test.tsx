import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import FormInput from '../components/pages/formPage/FormInput';
import { fn } from 'jest-mock';

describe('FormInput', () => {
  it('should call onChangeProduct with correct data when form is submitted', () => {
    const onChangeProduct = fn();
    const { getByLabelText, getByText } = render(<FormInput onChangeProduct={onChangeProduct} />);

    fireEvent.change(getByLabelText(/Title/i), { target: { value: 'New Product' } });
    fireEvent.change(getByLabelText(/Price/i), { target: { value: '100' } });
    fireEvent.change(getByLabelText(/Date/i), { target: { value: '2023-03-19' } });
    fireEvent.change(getByLabelText(/Description/i), {
      target: { value: 'Description of the new product' },
    });
    fireEvent.change(getByLabelText(/Category/i), { target: { value: 'smartphones' } });

    const file = new File(['(LOL)'], 'default.png', { type: 'image/png' });
    Object.defineProperty(getByLabelText(/image/i), 'files', {
      value: [file],
    });
    fireEvent.submit(getByText(/Submit/i));

    // Check that onChangeProduct was called with the correct data
    expect(onChangeProduct).toHaveBeenCalledWith({
      id: expect.any(Number),
      title: 'New Product',
      price: 100,
      date: '2023-03-19',
      productStatus: 'new',
      description: 'Description of the new product',
      imageUrl: expect.any(String),
      category: 'smartphones',
    });
  });
});
