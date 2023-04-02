import React, { useCallback, useEffect, useRef, useState } from 'react';
import './Home.css';
import { IProduct } from 'components/types/interface';
import ProductCard from './ProductCard/ProductCard';
import ModalProductCard from './ProductCard/ModalProductCard';

interface IHomePageProps {
  onChangeNamePage: (namePage: string) => void;
}

export async function getProducts(search: string): Promise<IProduct[]> {
  const res = await fetch(`https://dummyjson.com/products/search?q=${search}`);
  const data = await res.json();
  return data.products;
}

export async function getProductDetails(productId: number): Promise<IProduct> {
  const res = await fetch(`https://dummyjson.com/products/${productId}`);
  const data = await res.json();
  return data;
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
      // const res = await fetch(`https://dummyjson.com/products/search?q=${search}`);
      const data = await getProducts(search);
      setProductsList(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  }, []);

  const fetchProductDetails = useCallback(async (productId: number): Promise<void> => {
    try {
      const dataProduct = await getProductDetails(productId);
      setModalProduct(dataProduct);
      setIsModalOpen(true);
    } catch (error) {
      setIsModalOpen(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts(searchRef.current);
  }, [fetchProducts]);

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
