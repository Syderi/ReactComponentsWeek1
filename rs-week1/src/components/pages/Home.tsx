import products from '../dataProducts/products';
import ProductCard from '../ProductCard';
import React, { useEffect, useRef, useState } from 'react';
import './Home.css';
import { IProduct } from 'components/types/interface';

interface IHomePageProps {
  onChangeNamePage: (namePage: string) => void;
}

function Home({ onChangeNamePage }: IHomePageProps) {
  const [productsList, setProductsList] = useState<IProduct[]>([]);
  const [searchInput, setSearchInput] = useState(localStorage.getItem('searchTerm') ?? '');
  const searchRef = useRef<string>(searchInput);

  useEffect(() => {
    onChangeNamePage('Home Page');
    setProductsList(products);
    return () => {
      localStorage.setItem('searchTerm', searchRef.current || '');
    };
  }, [onChangeNamePage]);

  useEffect(() => {
    searchRef.current = searchInput;
  }, [searchInput]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const filteredProducts = productsList.filter((product) =>
    product.title.toLowerCase().includes(searchInput.toLowerCase())
  );
  return (
    <>
      <div className="card-search">
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            placeholder="Search..."
            value={searchInput}
            onChange={handleInputChange}
          />
          <button data-testid="search-button" type="submit">
            Search
          </button>
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

export default Home;
