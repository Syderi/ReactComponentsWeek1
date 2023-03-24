import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FormInput from '../components/pages/formPage/FormInput';
import { fn } from 'jest-mock';
import { vi } from 'vitest';

describe('FormInput', () => {
  test('should call onChangeProduct with correct data when form is submitted', async () => {
    const onChangeProduct = fn();
    window.URL.createObjectURL = vi.fn((file) => (file instanceof File && file.name) || '');
    const user = userEvent.setup();
    const { getByLabelText, getByText, getByTestId } = render(
      <FormInput onChangeProduct={onChangeProduct} />
    );

    fireEvent.change(getByLabelText(/Title/i), { target: { value: 'New Product' } });
    fireEvent.change(getByLabelText(/Price/i), { target: { value: '100' } });
    fireEvent.change(getByLabelText(/Description/i), {
      target: { value: 'Description of the new product' },
    });
    const file = new File(['LOL'], 'fakeImage', { type: 'image/png' });
    const inputImage = getByLabelText(/Image/i) as HTMLInputElement;

    await user.upload(inputImage, file);

    fireEvent.change(getByLabelText(/Date/i), { target: { value: '2022-03-19' } });
    fireEvent.click(getByTestId('rule-input'), { target: { checked: true } });
    fireEvent.click(getByTestId('new-input'), { target: { checked: true } });
    fireEvent.change(getByTestId('category-select-input'), { target: { value: 'laptops' } });
    fireEvent.submit(getByText(/Submit/i));

    expect(inputImage.files).toHaveLength(1);

    expect(onChangeProduct).toHaveBeenCalledWith({
      id: expect.any(Number),
      title: 'New Product',
      price: Number(100),
      date: '2022-03-19',
      productStatus: 'new',
      description: 'Description of the new product',
      imageUrl: expect.any(String),
      category: 'laptops',
    });
  });

  test('should not call onChangeProduct in submitted', () => {
    const onChangeProduct = fn();
    const { getByLabelText, getByText, getByTestId } = render(
      <FormInput onChangeProduct={onChangeProduct} />
    );

    fireEvent.change(getByLabelText(/Date/i), { target: { value: '3099-03-19' } });
    fireEvent.click(getByTestId('rule-input'), { target: { checked: true } });
    fireEvent.click(getByTestId('new-input'), { target: { checked: false } });
    fireEvent.change(getByTestId('category-select-input'), { target: { value: 'laptops' } });
    fireEvent.submit(getByText(/Submit/i));

    expect(onChangeProduct).not.toHaveBeenCalled();
  });
});
