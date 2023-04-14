import { Ecategory } from '../../../components/types/enum';
import React from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface IinputCategoryProps {
  register: UseFormRegisterReturn<'category'>;
  error: FieldError | undefined;
}

function InputCategory({ register, error }: IinputCategoryProps) {
  return (
    <div className="form-input">
      <label htmlFor="category-select">
        Category:{' '}
        {error && <span className="form-input-span-error">Error: You must choose category</span>}
      </label>
      <select
        id="category-select"
        defaultValue=""
        data-testid="category-select-input"
        {...register}
      >
        <option disabled value="">
          select type
        </option>
        <option value={Ecategory.smartphones}>{Ecategory.smartphones}</option>
        <option value={Ecategory.laptops}>{Ecategory.laptops}</option>
        <option value={Ecategory.fragrances}>{Ecategory.fragrances}</option>
      </select>
    </div>
  );
}

export default InputCategory;
