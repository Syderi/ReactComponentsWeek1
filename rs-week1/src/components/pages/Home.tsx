// import products from '../dataProducts/products';
import ProductCard from '../ProductCard';
import React, { Component } from 'react';
import './Home.css';
import { IProduct } from 'components/types/interface';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
// interface IHeaderProps {}

interface IState {
  products: IProduct[];
}

class HomePage extends Component<Record<string, never>, IState> {
  state: IState = {
    products: [],
  };

  async componentDidMount() {
    try {
      const response = await fetch('https://dummyjson.com/products?limit=12');
      const resProducts = await response.json();
      // console.error('resProducts', resProducts);
      const products = resProducts.products;
      // console.error('products', products);
      this.setState({ products });
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  render() {
    const { products } = this.state;
    console.log('products', products);
    return (
      <>
        <h3>Home page</h3>
        <div className="product-cards-container">
          {products.length ? (
            products.map((product) => <ProductCard product={product} key={product.id} />)
          ) : (
            <p>Loading ...</p>
          )}
        </div>
      </>
    );
  }
}

export default HomePage;
