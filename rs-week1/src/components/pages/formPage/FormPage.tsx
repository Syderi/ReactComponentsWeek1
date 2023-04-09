import './FormPage.css';
import { IFormCard } from 'components/types/interface';
import React, { useEffect } from 'react';
import FormInput from './FormInput';
import FormCard from './FormCard';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { useActions } from '../../../hooks/useActions';

interface IFormPageProps {
  onChangeNamePage: (namePage: string) => void;
}

function FormPage({ onChangeNamePage }: IFormPageProps) {
  useEffect(() => {
    onChangeNamePage('Form Page');
  });
  const { addToStateFormProducts } = useActions();
  const formCards = useSelector<RootState, IFormCard[]>((state) => state.form);

  console.log('formCards', formCards);

  const onChangeProduct = (newProduct: IFormCard) => {
    addToStateFormProducts(newProduct);
  };

  return (
    <div className="form-page">
      <h3>Form page</h3>
      <FormInput onChangeProduct={onChangeProduct} />
      <div className="form-cards-container">
        {formCards.length ? (
          formCards.map((product) => {
            return <FormCard key={product.id} product={{ ...product }} />;
          })
        ) : (
          <div>No products...</div>
        )}
      </div>
    </div>
  );
}

export default FormPage;
