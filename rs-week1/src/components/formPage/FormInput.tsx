import { IFormInputProps, FormData } from 'types/interface';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import InputImage from './InputComponents/InputImage';
import { validateDate } from '../../utils/Validate';
import InputProductStatus from './InputComponents/InputProductStatus';
import InputCategory from './InputComponents/InputCategory';

function FormInput({ onChangeProduct }: IFormInputProps) {
  const [statusValid, setStatusValid] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormData>({ mode: 'onSubmit', reValidateMode: 'onSubmit' });

  const fileName = watch('imageFile')?.[0]?.name || 'no name of image';

  const onSubmit = (data: FormData) => {
    setStatusValid(true);
    onChangeProduct({
      id: Date.now(),
      title: data.title,
      price: Number(data.price),
      date: data.date,
      productStatus: data.productStatus,
      description: data.description,
      imageUrl: URL.createObjectURL(data.imageFile[0]),
      category: data.category,
    });
    reset();
    setTimeout(() => {
      setStatusValid(false);
    }, 5000);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-input">
        <label htmlFor="title-input">
          Title:{' '}
          {errors.title && <span className="form-input-span-error">{errors.title.message}</span>}
        </label>
        <input
          {...register('title', {
            required: 'Error: not value',
            pattern: {
              value: /^[A-ZА-Я][A-ZА-Яa-zа-я]{4,}.*$/,
              message: 'Error: not First letter is capital, 5 characters',
            },
          })}
          type="text"
          id="title-input"
          placeholder="name product: Phone..."
        />
      </div>
      <div className="form-input">
        <label htmlFor="price-input">
          Price:
          {errors.price && <span className="form-input-span-error">{errors.price.message}</span>}
        </label>
        <input
          {...register('price', {
            required: 'Error: not value',
            pattern: {
              value: /^[1-9]\d*$/,
              message: 'Error: not correct Price',
            },
          })}
          type="number"
          inputMode="numeric"
          id="price-input"
          placeholder="set a price"
        />
      </div>
      <div className="form-input">
        <label htmlFor="description-input">
          Description:
          {errors.description && (
            <span className="form-input-span-error">{errors.description.message}</span>
          )}
        </label>
        <textarea
          {...register('description', {
            required: 'Error: not value',
            pattern: {
              value: /^[A-ZА-Я][A-ZА-Яa-zа-я]{4,}.*$/,
              message: 'Error: not First letter is capital, 5 characters',
            },
          })}
          id="description-input"
          data-testid="description-input"
          placeholder="description product: Phone is very..."
        />
      </div>
      <InputImage
        error={errors.imageFile}
        register={register('imageFile', { required: 'true' })}
        fileName={fileName}
      />
      <div className="form-input">
        <label htmlFor="date-input">
          Date of manufacture:
          {errors.date && <span className="form-input-span-error">{errors.date.message}</span>}
        </label>
        <input
          {...register('date', {
            required: 'Error: not date',
            validate: {
              validate: (value) => validateDate(value) || 'Error: product from the future',
            },
          })}
          type="date"
          id="date-input"
          data-testid="date-input"
        />
      </div>
      <div className="form-input">
        <label htmlFor="rule-input">
          <input
            {...register('rules', {
              required: true,
            })}
            type="checkbox"
            id="rule-input"
            data-testid="rule-input"
          />
          I agree to the posting rules.
          {errors.rules && (
            <span className="form-input-span-error">Error: You must agree to the rules</span>
          )}
        </label>
      </div>
      <InputProductStatus
        error={errors.productStatus}
        register={register('productStatus', { required: true })}
      />
      <InputCategory error={errors.category} register={register('category', { required: true })} />
      <div className="form-input">
        <label htmlFor="category-select">
          Status: {statusValid && <span style={{ color: 'green' }}>Card added</span>}
        </label>
        <button type="submit">Submit CARD</button>
      </div>
    </form>
  );
}

export default FormInput;
