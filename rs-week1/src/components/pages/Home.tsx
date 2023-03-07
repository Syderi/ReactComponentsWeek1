import products from '../dataProducts/products';
import ProductCard from '../ProductCard';
import React, { Component } from 'react';
import './Home.css';

class HomePage extends Component {
  render() {
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
}

export default HomePage;
