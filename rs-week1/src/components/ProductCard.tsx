import React, { Component } from 'react';
import { IProductProps } from './types/interface';
import './ProductCard.css';
import defaultPic from '../assets/img/default.png';

interface IProductCardState {
  thumbnailError: boolean;
}

class ProductCard extends Component<IProductProps, IProductCardState> {
  constructor(props: IProductProps) {
    super(props);
    this.state = {
      thumbnailError: false,
    };
  }

  handleThumbnailError = () => {
    this.setState({ thumbnailError: true });
  };

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
          <img
            src={this.state.thumbnailError ? defaultPic : thumbnail}
            alt={title}
            onError={this.handleThumbnailError}
          />
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
