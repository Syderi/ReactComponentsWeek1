import { IFormCardProps } from 'components/types/interface';
import React, { Component } from 'react';
import './FormCard.css';

class FormCard extends Component<IFormCardProps> {
  constructor(props: IFormCardProps) {
    super(props);
  }

  render() {
    const { id, title, description, price, category, imageUrl } = this.props.product;

    return (
      <div data-testid={`form-card${id}`} className="form-card" id={`product-card${id}`}>
        <div className="form-card__image">
          <img src={imageUrl} alt={title} />
        </div>
        <div className="form-card__info">
          <h2>{title}</h2>
          <p>Category: {category}</p>
          <p>Price: ${price}</p>
          <p>{description}</p>
        </div>
      </div>
    );
  }
}

export default FormCard;
