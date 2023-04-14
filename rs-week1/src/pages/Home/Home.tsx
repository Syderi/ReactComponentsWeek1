import './Home.css';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useGetProductsQuery } from '../../store/Api/Api';
import { useSelector } from 'react-redux';
import { useActions } from '../../hooks/useActions';

import { RootState } from '../../store/store';
import Loader from '../../components/Loader/Loading';
import ProductCard from '../../components/ProductCard/ProductCard';

function Home() {
  const { changeSearch } = useActions();
  const stateSearch = useSelector<RootState, string>((state) => state.search.stateSearch);
  const [searchInput, setSearchInput] = useState(stateSearch);
  const { data: productsList, isLoading } = useGetProductsQuery(stateSearch);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    changeSearch(searchInput);
  };

  return (
    <>
      <h3>Home page</h3>
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
      {isLoading && <Loader />}
      <div className="product-cards-container">
        {productsList?.length ? (
          productsList.map((product) => <ProductCard product={product} key={product.id} />)
        ) : (
          <p>No found product ...</p>
        )}
      </div>
    </>
  );
}

export default Home;
