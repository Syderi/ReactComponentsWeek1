import { IProduct } from 'components/types/interface';
import React from 'react';
import './ModalProductCard.css';

type ProductModalProps = {
  product: IProduct;
  onClose: () => void;
};

function ModalProductCard({ product, onClose }: ProductModalProps) {
  const {
    title,
    description,
    price,
    discountPercentage,
    rating,
    stock,
    brand,
    category,
    thumbnail,
  } = product;

  const discountedPrice = price - (price * discountPercentage) / 100;

  return (
    <div className="product-modal">
      <div className="product-modal__content">
        <button className="product-modal__close-btn" onClick={onClose}>
          &#10006;
        </button>
        <div className="product-modal__image">
          <img src={thumbnail} alt={title} />
        </div>
        <div className="product-modal__info">
          <h2>{title}</h2>
          <p>{description}</p>
          <p>Price: ${discountedPrice}</p>
          <p>Rating: {rating}</p>
          <p>Stock: {stock}</p>
          <p>Brand: {brand}</p>
          <p>Category: {category}</p>
        </div>
      </div>
    </div>
  );
}

export default ModalProductCard;
