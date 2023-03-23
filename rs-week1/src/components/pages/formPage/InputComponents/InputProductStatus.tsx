import React, { RefObject } from 'react';
import { Component } from 'react';

interface IinputProductStatusProps {
  valid: boolean;
  forwardRefNew: RefObject<HTMLInputElement>;
  forwardRefUsed: RefObject<HTMLInputElement>;
}

class InputProductStatus extends Component<IinputProductStatusProps> {
  render() {
    const { valid, forwardRefNew, forwardRefUsed } = this.props;
    return (
      <div className="form-input">
        <div className="radio-label">
          <label>
            Choose product status:
            {!valid && <span className="form-input-span-error">Error</span>}
          </label>
        </div>
        <div className="radio-buttons">
          <label>
            <input
              type="radio"
              name="productStatus"
              value="new"
              data-testid="new-input"
              ref={forwardRefNew}
            />
            New product
          </label>
          <label>
            <input type="radio" name="productStatus" value="used" ref={forwardRefUsed} />
            Used product
          </label>
        </div>
      </div>
    );
  }
}

export default InputProductStatus;
