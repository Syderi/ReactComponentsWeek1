import { IFormCardProps } from 'components/types/interface';
import React from 'react';
import './FormCard.css';

function FormCard({ product }: IFormCardProps) {
  const { id, title, description, price, date, productStatus, category, imageUrl } = product;

  return (
    <div data-testid={`form-card${id}`} className="form-card" id={`product-card${id}`}>
      <div className="form-card__image">
        <img src={imageUrl} alt={title} />
      </div>
      <div className="form-card__info">
        <h2>{title}</h2>
        <p>Category: {category}</p>
        <p>Price: ${price}</p>
        <p>Date of issue: {date}</p>
        <p>Product status: {productStatus}</p>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default FormCard;
