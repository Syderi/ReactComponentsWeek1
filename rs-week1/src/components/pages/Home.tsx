import React, { useEffect, useRef, useState } from 'react';
import './Home.css';
import { IProduct } from 'components/types/interface';
import ProductCard from './ProductCard/ProductCard';
import ModalProductCard from './ProductCard/ModalProductCard';

interface IHomePageProps {
  onChangeNamePage: (namePage: string) => void;
}

function Home({ onChangeNamePage }: IHomePageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [productsList, setProductsList] = useState<IProduct[]>([]);
  const [modalProduct, setModalProduct] = useState<IProduct>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchInput, setSearchInput] = useState(localStorage.getItem('searchTerm') ?? '');
  const searchRef = useRef<string>(searchInput);

  useEffect(() => {
    setIsLoading(true);

    try {
      fetch('https://dummyjson.com/products')
        .then((res) => res.json())
        .then((res) => {
          setProductsList(res.products);
          setIsLoading(false);
        });
    } catch (error) {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    onChangeNamePage('Home Page');
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
    setIsLoading(true);

    try {
      fetch(`https://dummyjson.com/products/search?q=${searchInput}`)
        .then((res) => res.json())
        .then((res) => {
          setProductsList(res.products);
          setIsLoading(false);
        });
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handleShowModal = (productId: number) => {
    try {
      fetch(`https://dummyjson.com/products/${productId}`)
        .then((res) => res.json())
        .then((dataProduct) => {
          setModalProduct(dataProduct);
          setIsModalOpen(true);
        });
    } catch (error) {
      setIsModalOpen(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="product-cards-container">
          {isModalOpen && modalProduct && (
            <ModalProductCard product={modalProduct} closeModal={closeModal} />
          )}
          {productsList.length ? (
            productsList.map((product) => (
              <ProductCard product={product} key={product.id} handleShowModal={handleShowModal} />
            ))
          ) : (
            <p>No found product ...</p>
          )}
        </div>
      )}
    </>
  );
}

export default Home;
