import './FormPage.css';
import { IFormCard } from 'components/types/interface';
import React, { Component } from 'react';
import FormCard from './FormCard';
import defaultPic from '../../../assets/img/default.png';

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
  fileInputRef: React.RefObject<HTMLInputElement>;
  constructor(props: IFormPageProps) {
    super(props);

    this.state = {
      title: '',
      price: 1,
      description: '',
      imageUrl: defaultPic,
      category: '',
      products: [],
    };
    this.fileInputRef = React.createRef();
  }

  componentDidMount() {
    this.props.onChangeNamePage('Form Page');
    console.log(this.state);
  }

  handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ title: event.target.value });
  };

  handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ price: Number(event.target.value) });
  };

  handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({ description: event.target.value });
  };

  handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ category: event.target.value });
  };

  handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.setState({ imageUrl: e.target?.result as string });
      };
      reader.readAsDataURL(event.target.files[0]);
    }
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
      imageUrl: defaultPic,
      category: '',
      products: newProducts,
    });
    // console.log(this.state);
  };

  render() {
    const { title, price, description, category, products } = this.state;
    return (
      <div className="form-page">
        <h3>Form page</h3>
        <form onSubmit={this.handleFormSubmit}>
          <div className="form-input">
            <label htmlFor="title-input">Title:</label>
            <input type="text" id="title-input" value={title} onChange={this.handleTitleChange} />
          </div>
          <div className="form-input">
            <label htmlFor="price-input">Price:</label>
            <input type="number" id="price-input" value={price} onChange={this.handlePriceChange} />
          </div>
          <div className="form-input">
            <label htmlFor="description-input">Description:</label>
            <textarea
              id="description-input"
              value={description}
              onChange={this.handleDescriptionChange}
              placeholder="Описание товара"
            />
          </div>
          <div className="form-input">
            <label htmlFor="image-input">Image:</label>
            <input type="file" id="image-input" onChange={this.handleImageChange} />
          </div>
          <div className="form-input">
            <label htmlFor="category-select">Category:</label>
            <select id="category-select" value={category} onChange={this.handleCategoryChange}>
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
      </div>
    );
  }
}

export default FormPage;
