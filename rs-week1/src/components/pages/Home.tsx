import products from '../dataProducts/products';
import ProductCard from '../ProductCard';
import React, { Component } from 'react';
import './Home.css';
import { IProduct } from 'components/types/interface';

interface IState {
  products: IProduct[];
  searchInput: string;
}

interface IHomePageProps {
  onChangeNamePage: (namePage: string) => void;
}

class Home extends Component<IHomePageProps, IState> {
  private beforeUnloadListener: ((event: BeforeUnloadEvent) => void) | null = null;
  constructor(props: IHomePageProps) {
    super(props);
    this.state = {
      products: products,
      searchInput: '',
    };
  }

  componentDidMount() {
    this.props.onChangeNamePage('Home Page');
    const searchTerm = localStorage.getItem('searchTerm');
    if (searchTerm) {
      this.setState({ searchInput: searchTerm });
    }
    // Добавляем обработчик события beforeunload
    this.beforeUnloadListener = () => {
      localStorage.setItem('searchTerm', this.state.searchInput);
    };
    window.addEventListener('beforeunload', this.beforeUnloadListener);
  }

  componentWillUnmount() {
    localStorage.setItem('searchTerm', this.state.searchInput);
    if (this.beforeUnloadListener) {
      window.removeEventListener('beforeunload', this.beforeUnloadListener);
    }
  }

  componentDidUpdate() {}

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    this.setState({ searchInput: value });
  };

  handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  render() {
    const { products } = this.state;
    const { searchInput } = this.state;

    const filteredProducts = products.filter((product) => {
      return product.title.toLowerCase().includes(searchInput.toLowerCase());
    });

    return (
      <>
        <div className="card-search">
          <form onSubmit={this.handleFormSubmit}>
            <input
              type="text"
              placeholder="Search..."
              value={searchInput}
              onChange={this.handleInputChange}
            />
            <button type="submit">Search</button>
          </form>
        </div>
        <h3>Home page</h3>
        <div className="product-cards-container">
          {filteredProducts.length ? (
            filteredProducts.map((product) => <ProductCard product={product} key={product.id} />)
          ) : (
            <p>No found product ...</p>
          )}
        </div>
      </>
    );
  }
}

export default Home;
