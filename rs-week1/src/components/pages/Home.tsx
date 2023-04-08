import React, { useCallback, useEffect, useRef, useState } from 'react';
import './Home.css';
import { IProduct } from 'components/types/interface';
import ProductCard from './ProductCard/ProductCard';
import ModalProductCard from './ProductCard/ModalProductCard';
import { getProductDetails, getProducts } from './Api/Api';
import Loader from './ProductCard/Loading';

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

  const fetchProducts = useCallback(async (search: string): Promise<void> => {
    setIsLoading(true);
    try {
      const data = await getProducts(search);
      setProductsList(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  }, []);

  const fetchProductDetails = useCallback(async (productId: number): Promise<void> => {
    setIsLoading(true);
    try {
      const dataProduct = await getProductDetails(productId);
      setModalProduct(dataProduct);
      setIsModalOpen(true);
      setIsLoading(false);
    } catch (error) {
      setIsModalOpen(false);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts(searchRef.current);
  }, [fetchProducts]);

  useEffect(() => {
    onChangeNamePage('Home Page');
  }, [onChangeNamePage]);

  useEffect(() => {
    searchRef.current = searchInput;
  }, [searchInput]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    localStorage.setItem('searchTerm', searchRef.current || '');
    fetchProducts(searchRef.current);
  };

  const handleShowModal = (productId: number) => {
    fetchProductDetails(productId);
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
      {isLoading && <Loader />}
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
    </>
  );
}

export default Home;
