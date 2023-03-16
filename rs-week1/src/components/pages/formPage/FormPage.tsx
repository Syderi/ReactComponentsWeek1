import { IFormCard } from 'components/types/interface';
import React, { Component } from 'react';
import FormCard from './FormCard';

interface IFormPageProps {
  onChangeNamePage: (namePage: string) => void;
}

interface IFormPageState {
  title: string;
  price: number;
  description: string;
  imageUrl: string;
  category: string;
  products: IFormCard[];
}

class FormPage extends Component<IFormPageProps, IFormPageState> {
  constructor(props: IFormPageProps) {
    super(props);

    this.state = {
      title: '',
      price: 1,
      description: '',
      imageUrl: '',
      category: '',
      products: [],
    };
  }

  componentDidMount() {
    this.props.onChangeNamePage('Form Page');
    console.log(this.state);
  }

  handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ title: event.target.value });
  };

  handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { title, price, description, imageUrl, category, products } = this.state;
    const id = Date.now();

    const newProduct = {
      id,
      title,
      price,
      description,
      imageUrl,
      category,
    };

    const newProducts = [...products, newProduct];

    this.setState({
      title: '',
      price: 0,
      description: '',
      imageUrl: '',
      category: '',
      products: newProducts,
    });
    console.log(this.state);
  };

  render() {
    const { title, price, description, imageUrl, category, products } = this.state;
    return (
      <>
        <h3>Form page</h3>
        <form onSubmit={this.handleFormSubmit}>
          <div>
            <label>
              Title:
              <input type="text" value={title} onChange={this.handleTitleChange} />
            </label>
          </div>
          <div>
            <label>
              Price:
              <input type="number" />
            </label>
          </div>
          <div>
            <label>
              Description:
              <textarea defaultValue={'Привет! Тут просто немного текста внутри тега textarea'} />
            </label>
          </div>
          <div>
            <label>
              Image:
              <input type="file" />
            </label>
          </div>
          <div>
            <select>
              <option value="smartphones">smartphones</option>
              <option value="laptops">laptops</option>
              <option value="fragrances">fragrances</option>
            </select>
          </div>
          <button type="submit">Submit</button>
        </form>
        {products.length ? (
          products.map((product) => {
            return <FormCard key={product.id} product={{ ...product }} />;
          })
        ) : (
          <div>No products...</div>
        )}
      </>
    );
  }
}

export default FormPage;
