import React from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface IinputProductStatusProps {
  register: UseFormRegisterReturn<'productStatus'>;
  error: FieldError | undefined;
}

function InputProductStatus({ register, error }: IinputProductStatusProps) {
  return (
    <div className="form-input">
      <div className="radio-label">
        <label>
          Choose product status:
          {error && <span className="form-input-span-error">Error: You must choose status</span>}
        </label>
      </div>
      <div className="radio-buttons">
        <label>
          <input type="radio" value="new" data-testid="new-input" {...register} />
          New product
        </label>
        <label>
          <input type="radio" value="used" {...register} />
          Used product
        </label>
      </div>
    </div>
  );
}

export default InputProductStatus;
