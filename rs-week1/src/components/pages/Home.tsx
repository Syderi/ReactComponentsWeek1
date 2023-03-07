import products from '../dataProducts/products';
import ProductCard from '../ProductCard';
import React from 'react';
import './Home.css';

export function HomePage() {
  return (
    <>
      <h3>Home page</h3>
      <div className="product-cards-container">
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </>
  );
}
