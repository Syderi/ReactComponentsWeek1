import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FormInput from '../components/pages/formPage/FormInput';
// import { fn } from 'jest-mock';
import { vi } from 'vitest';

describe('FormInput', () => {
  test('should call onChangeProduct with correct data when form is submitted', async () => {
    const onChangeProduct = vi.fn();
    window.URL.createObjectURL = vi.fn((file) => (file instanceof File && file.name) || '');
    const user = userEvent.setup();
    const { getByLabelText, getByText, getByTestId } = render(
      <FormInput onChangeProduct={onChangeProduct} />
    );

    const file = new File(['LOL'], 'fakeImage', { type: 'image/png' });

    // fireEvent.click(getByTestId('rule-input'), { target: { checked: true } });
    // fireEvent.click(getByTestId('new-input'), { target: { checked: true } });
    // fireEvent.change(getByTestId('category-select-input'), { target: { value: 'laptops' } });
    // fireEvent.submit(getByText(/Submit/i));

    const titleInput = getByLabelText(/Title/i);
    expect(titleInput).toBeInTheDocument();

    const priceInput = getByLabelText(/Price/i);
    expect(priceInput).toBeInTheDocument();

    const dateInput = getByLabelText(/Date/i);
    expect(dateInput).toBeInTheDocument();

    const newInput = getByTestId('new-input');
    expect(newInput).toBeInTheDocument();

    const descriptionInput = getByLabelText(/Description/i);
    expect(descriptionInput).toBeInTheDocument();

    const imageInput = getByLabelText(/Image/i) as HTMLInputElement;
    expect(imageInput).toBeInTheDocument();

    const categorySelectInput = getByTestId('category-select-input');
    expect(categorySelectInput).toBeInTheDocument();

    const ruleInput = getByTestId('rule-input');
    expect(ruleInput).toBeInTheDocument();

    const submitButton = getByText(/Submit/i);
    expect(submitButton).toBeInTheDocument();

    await user.type(titleInput, 'Newproduct');
    await user.type(priceInput, '100');
    await user.type(dateInput, '2021-03-19');
    await user.click(newInput);
    await user.type(descriptionInput, 'Description of the new product');
    await user.upload(imageInput, file);
    await user.selectOptions(categorySelectInput, 'laptops');
    await user.click(ruleInput);
    await user.click(submitButton);

    expect(imageInput.files).toHaveLength(1);

    expect(onChangeProduct).toHaveBeenCalledWith({
      id: expect.any(Number),
      title: 'Newproduct',
      price: Number(100),
      date: '2021-03-19',
      productStatus: 'new',
      description: 'Description of the new product',
      imageUrl: expect.any(String),
      category: 'laptops',
    });
  });

  test('should not call onChangeProduct in submitted', () => {
    const onChangeProduct = vi.fn();
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
