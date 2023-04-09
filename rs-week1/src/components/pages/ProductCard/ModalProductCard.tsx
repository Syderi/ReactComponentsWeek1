import React from 'react';
import { useGetProductDetailsQuery } from '../Api/Api';
import Loader from './Loading';
import './ModalProductCard.css';

type ProductModalProps = {
  productID: number;
  closeModal: () => void;
};

function ModalProductCard({ productID, closeModal }: ProductModalProps) {
  const { data: product, isLoading } = useGetProductDetailsQuery(productID);

  let discountedPrice = 0;
  if (product) {
    discountedPrice = product.price - (product.price * product.discountPercentage) / 100;
  }

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  const handleModalCloseClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    closeModal();
  };

  if (isLoading) return <Loader />;

  return (
    <div className="product-modal" onClick={handleOverlayClick}>
      <div className="product-modal__content">
        <button className="product-modal__close-btn" onClick={handleModalCloseClick}>
          &#10006;
        </button>
        <div className="product-modal__image">
          <img src={product?.thumbnail ?? ''} alt={product?.title} />
        </div>
        <div className="product-modal__info">
          <h2>{product?.title}</h2>
          <p>{product?.description}</p>
          <p>Price: ${discountedPrice}</p>
          <p>Rating: {product?.rating}</p>
          <p>Stock: {product?.stock}</p>
          <p>Brand: {product?.brand}</p>
          <p>Category: {product?.category}</p>
        </div>
      </div>
    </div>
  );
}

export default ModalProductCard;
