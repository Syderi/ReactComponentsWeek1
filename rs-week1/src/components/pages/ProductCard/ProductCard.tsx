import React, { useState } from 'react';
import { IProductProps } from '../../types/interface';
import './ProductCard.css';
import defaultPic from '../../../assets/img/default.png';
import ModalProductCard from './ModalProductCard';

function ProductCard({ product }: IProductProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [thumbnailError, seThumbnailError] = useState(false);

  const handleThumbnailError = () => {
    seThumbnailError(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleShowModal = () => {
    setIsModalOpen(true);
  };

  const { id, title, price, discountPercentage, brand, thumbnail } = product;
  const discountedPrice = price - (price * discountPercentage) / 100;

  return (
    <>
      {isModalOpen && <ModalProductCard productID={product.id} closeModal={closeModal} />}
      <div
        data-testid={`product-card${id}`}
        className="product-card"
        id={`product-card${id}`}
        onClick={() => handleShowModal()}
      >
        <div className="product-card__image">
          <img
            src={thumbnailError ? defaultPic : thumbnail}
            alt={title}
            onError={handleThumbnailError}
          />
        </div>
        <div className="product-card__info">
          <h2>{title}</h2>
          <p>Price: ${discountedPrice}</p>
          <p>Brand: {brand}</p>
        </div>
        <button className="product-card__button">Show more</button>
      </div>
    </>
  );
}

export default React.memo(ProductCard);
