import './FormPage.css';
import React from 'react';
import { IFormCard } from 'types/interface';

import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import FormInput from '../../components/formPage/FormInput';
import FormCard from '../../components/formPage/FormCard';
import { useActions } from '../../hooks/useActions';

function FormPage() {
  const { addToStateFormProducts } = useActions();
  const formCards = useSelector<RootState, IFormCard[]>((state) => state.form);

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
