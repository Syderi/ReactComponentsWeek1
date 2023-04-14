import React from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface IinputImageProps {
  register: UseFormRegisterReturn<'imageFile'>;
  error: FieldError | undefined;
  fileName: string;
}

function InputImage({ register, error, fileName }: IinputImageProps) {
  return (
    <div className="form-input">
      <label htmlFor="image-input">
        Image:{' '}
        {error && <span className="form-input-span-error">Error: You must choose image</span>}
      </label>
      <input type="file" accept="image/jpeg,image/png,image/gif" id="image-input" {...register} />
      {<span>{fileName}</span>}
    </div>
  );
}

export default InputImage;
