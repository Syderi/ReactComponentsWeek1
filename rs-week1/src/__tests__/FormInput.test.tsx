import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import FormInput from '../components/formPage/FormInput';

afterEach(() => {
  cleanup();
  vi.resetAllMocks();
});

describe('FormInput', () => {
  test('should call onChangeProduct with correct data when form is submitted', async () => {
    const onChangeProductMock = vi.fn();
    window.URL.createObjectURL = vi.fn((file: File) => file.name);
    const user = userEvent.setup();
    const { getByLabelText, getByText, getByTestId } = render(
      <FormInput onChangeProduct={onChangeProductMock} />
    );

    const file = new File(['LOL'], 'fakeImage', { type: 'image/png' });

    const titleInput = getByLabelText(/Title/i) as HTMLLabelElement;
    expect(titleInput).toBeInTheDocument();

    const priceInput = getByLabelText(/Price/i) as HTMLLabelElement;
    expect(priceInput).toBeInTheDocument();

    const dateInput = getByLabelText(/Date/i) as HTMLLabelElement;
    expect(dateInput).toBeInTheDocument();

    const newInput = getByTestId('new-input') as HTMLInputElement;
    expect(newInput).toBeInTheDocument();

    const descriptionInput = getByLabelText(/Description/i) as HTMLLabelElement;
    expect(descriptionInput).toBeInTheDocument();

    const imageInput = getByLabelText(/Image/i) as HTMLInputElement;
    expect(imageInput).toBeInTheDocument();

    const categorySelectInput = getByTestId('category-select-input') as HTMLSelectElement;
    expect(categorySelectInput).toBeInTheDocument();

    const ruleInput = getByTestId('rule-input') as HTMLInputElement;
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

    expect(onChangeProductMock).toHaveBeenCalled();
    expect(onChangeProductMock).toBeCalledTimes(1);

    expect(onChangeProductMock).toHaveBeenCalledWith({
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
    const onChangeProductMock = vi.fn();
    const { getByLabelText, getByText, getByTestId } = render(
      <FormInput onChangeProduct={onChangeProductMock} />
    );

    fireEvent.change(getByLabelText(/Date/i), { target: { value: '3099-03-19' } });
    fireEvent.click(getByTestId('rule-input'), { target: { checked: true } });
    fireEvent.click(getByTestId('new-input'), { target: { checked: false } });
    fireEvent.change(getByTestId('category-select-input'), { target: { value: 'laptops' } });
    fireEvent.submit(getByText(/Submit/i));

    expect(onChangeProductMock).not.toHaveBeenCalled();
  });
});
