import { Ecategory } from '../../../types/enum';
import React, { RefObject } from 'react';
import { Component } from 'react';

interface IinputCategoryProps {
  valid: boolean;
  forwardRef: RefObject<HTMLSelectElement>;
}

class InputCategory extends Component<IinputCategoryProps> {
  render() {
    const { valid, forwardRef } = this.props;
    return (
      <div className="form-input">
        <label htmlFor="category-select">
          Category: {!valid && <span className="form-input-span-error">Error</span>}
        </label>
        <select
          id="category-select"
          ref={forwardRef}
          defaultValue=""
          data-testid="category-select-input"
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
}

export default InputCategory;
