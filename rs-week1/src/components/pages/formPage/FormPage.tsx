import './FormPage.css';
import { IFormCard } from 'components/types/interface';
import React, { Component } from 'react';
import FormCard from './FormCard';
import FormInput from './FormInput';

interface IFormPageProps {
  onChangeNamePage: (namePage: string) => void;
}

interface IFormPageState {
  products: IFormCard[];
}

class FormPage extends Component<IFormPageProps, IFormPageState> {
  constructor(props: IFormPageProps) {
    super(props);
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    this.props.onChangeNamePage('Form Page');
  }

  onChangeProduct = (newProduct: IFormCard) => {
    const { products } = this.state;
    const newProducts = [...products, newProduct];

    this.setState({
      products: newProducts,
    });
  };

  render() {
    const { products } = this.state;
    return (
      <div className="form-page">
        <h3>Form page</h3>
        <FormInput onChangeProduct={this.onChangeProduct} />
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
}

export default FormPage;
