import React, { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react';
import './Home.css';
import { IProduct } from 'components/types/interface';
import ProductCard from './ProductCard/ProductCard';
import ModalProductCard from './ProductCard/ModalProductCard';
import { getProductDetails, getProducts, useGetProductsQuery } from './Api/Api';
import Loader from './ProductCard/Loading';
import { useActions } from '../../hooks/useActions';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

interface IHomePageProps {
  onChangeNamePage: (namePage: string) => void;
}

function Home({ onChangeNamePage }: IHomePageProps) {
  const { changeSearch } = useActions();
  const stateSearch = useSelector<RootState, string>((state) => state.search.stateSearch);

  // const [isLoading, setIsLoading] = useState(true);
  // const [productsList, setProductsList] = useState<IProduct[]>([]);
  const [modalProduct, setModalProduct] = useState<IProduct>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchInput, setSearchInput] = useState(stateSearch);
  // const searchRef = useRef<string>(searchInput);

  const { data: productsList, isLoading } = useGetProductsQuery(stateSearch);
  // console.log('data = productsList', productsList);

  // const fetchProducts = async (search: string): Promise<void> => {
  //   setIsLoading(true);
  //   try {
  //     const data = await getProducts(search);
  //     const data = useGetProductsQuery(search);
  //     setProductsList(data);
  //     setIsLoading(false);
  //   } catch (error) {
  //     setIsLoading(false);
  //   }
  // };

  const fetchProductDetails = useCallback(async (productId: number): Promise<void> => {
    // setIsLoading(true);
    try {
      const dataProduct = await getProductDetails(productId);
      setModalProduct(dataProduct);
      setIsModalOpen(true);
      // setIsLoading(false);
    } catch (error) {
      setIsModalOpen(false);
      // setIsLoading(false);
    }
  }, []);

  // useEffect(() => {
  //   fetchProducts(stateSearch);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useEffect(() => {
    onChangeNamePage('Home Page');
  }, [onChangeNamePage]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // localStorage.setItem('searchTerm', searchRef.current || '');
    changeSearch(searchInput);
    // fetchProducts(stateSearch);
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

        {productsList?.length ? (
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
