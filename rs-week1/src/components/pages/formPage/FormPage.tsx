import './FormPage.css';
import { IFormCard } from 'components/types/interface';
import React, { useEffect } from 'react';
import FormInput from './FormInput';
import FormCard from './FormCard';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { ADD_FORM_CARD } from '../../../store/redusers/formReducer';

interface IFormPageProps {
  onChangeNamePage: (namePage: string) => void;
}

function FormPage({ onChangeNamePage }: IFormPageProps) {
  useEffect(() => {
    onChangeNamePage('Form Page');
  });
  const dispatch = useDispatch();
  const formCards = useSelector<RootState, IFormCard[]>((state) => state.formReduсer);

  console.log('formCards', formCards);

  // const [products, setProducts] = useState<IFormCard[]>([]);

  const onChangeProduct = (newProduct: IFormCard) => {
    // setProducts([...products, newProduct]);
    dispatch(ADD_FORM_CARD(newProduct));
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
