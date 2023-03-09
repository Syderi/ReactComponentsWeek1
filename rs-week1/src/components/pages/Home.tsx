// import products from '../dataProducts/products';
import ProductCard from '../ProductCard';
import React, { Component } from 'react';
import './Home.css';
import { IProduct } from 'components/types/interface';

interface IState {
  products: IProduct[];
  searchTerm: string;
  isLoading: boolean;
}

interface IHomePageProps {
  searchTerm: string;
}

class HomePage extends Component<IHomePageProps, IState> {
  constructor(props: IHomePageProps) {
    super(props);
    this.state = {
      products: [],
      searchTerm: props.searchTerm,
      isLoading: true,
    };
  }

  // state: IState = {
  //   products: [],
  //   searchTerm: '',
  // };

  async componentDidMount() {
    try {
      const response = await fetch('https://dummyjson.com/products?limit=12');
      const resProducts = await response.json();
      const products = resProducts.products;
      this.setState({ products, isLoading: false });
    } catch (error) {
      console.error('Error fetching products:', error);
      this.setState({ isLoading: false });
    }
  }

  componentDidUpdate(prevProps: IHomePageProps) {
    if (prevProps.searchTerm !== this.props.searchTerm) {
      this.setState({ searchTerm: this.props.searchTerm });
    }
  }

  // handleSearch = (searchTerm: string) => {
  //   this.setState({ searchTerm });
  // };

  render() {
    const { products, searchTerm, isLoading } = this.state;

    console.log('products', products);
    console.log('searchTerm Home', searchTerm);

    const filteredProducts = products.filter((product) => {
      return product.title.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
      <>
        <h3>Home page</h3>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="product-cards-container">
            {filteredProducts.length ? (
              filteredProducts.map((product) => <ProductCard product={product} key={product.id} />)
            ) : (
              <p>No found product ...</p>
            )}
          </div>
        )}
      </>
    );
  }
}

export default HomePage;
