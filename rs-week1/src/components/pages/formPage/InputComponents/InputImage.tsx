import React, { RefObject } from 'react';
import { Component } from 'react';

interface IinputImageProps {
  valid: boolean;
  forwardRef: RefObject<HTMLInputElement>;
  imageFile: File | null;
}

class InputImage extends Component<IinputImageProps> {
  render() {
    const { valid, forwardRef, imageFile } = this.props;
    return (
      <div className="form-input">
        <label htmlFor="image-input">
          Image: {!valid && <span className="form-input-span-error">Error</span>}
        </label>
        <input
          type="file"
          accept="image/jpeg,image/png,image/gif"
          id="image-input"
          ref={forwardRef}
        />
        {imageFile && <span>{imageFile.name}</span>}
      </div>
    );
  }
}

export default InputImage;
