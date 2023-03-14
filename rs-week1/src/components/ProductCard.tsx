import React, { Component } from 'react';
import { IProductProps } from './types/interface';
import './ProductCard.css';

class ProductCard extends Component<IProductProps> {
  render() {
    const {
      id,
      title,
      description,
      price,
      discountPercentage,
      rating,
      stock,
      brand,
      category,
      thumbnail,
    } = this.props.product;

    const discountedPrice = price - (price * discountPercentage) / 100;

    return (
      <div data-testid={`product-card${id}`} className="product-card" id={`product-card${id}`}>
        <div className="product-card__image">
          <img src={thumbnail} alt={title} />
        </div>
        <div className="product-card__info">
          <h2>{title}</h2>
          <p>{description}</p>
          <p>Price: ${discountedPrice}</p>
          <p>Rating: {rating}</p>
          <p>Stock: {stock}</p>
          <p>Brand: {brand}</p>
          <p>Category: {category}</p>
        </div>
        <button className="product-card__button">Add to cart</button>
      </div>
    );
  }
}

export default ProductCard;
