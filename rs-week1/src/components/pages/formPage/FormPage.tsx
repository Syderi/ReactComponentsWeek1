import './FormPage.css';
import { IFormCard } from 'components/types/interface';
import React, { useEffect, useState } from 'react';
import FormInput from './FormInput';
import FormCard from './FormCard';
// import FormInput from './FormInput';
// import FormCard from './FormCard';

interface IFormPageProps {
  onChangeNamePage: (namePage: string) => void;
}

function FormPage({ onChangeNamePage }: IFormPageProps) {
  useEffect(() => {
    onChangeNamePage('Form Page');
  });

  const [products, setProducts] = useState<IFormCard[]>([]);

  const onChangeProduct = (newProduct: IFormCard) => {
    setProducts([...products, newProduct]);
  };

  return (
    <div className="form-page">
      <h3>Form page</h3>
      <FormInput onChangeProduct={onChangeProduct} />
      <div className="form-cards-container">
        {products.length ? (
          products.map((product) => {
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
