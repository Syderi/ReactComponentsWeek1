import './FormPage.css';
import { IFormCard } from 'components/types/interface';
import React, { Component } from 'react';
import FormCard from './FormCard';
import defaultPic from '../../../assets/img/default.png';

interface IFormPageProps {
  onChangeNamePage: (namePage: string) => void;
}

interface IFormPageState {
  price: number;
  description: string;
  imageUrl: string;
  imageFile: File | null;
  category: string;
  products: IFormCard[];
}

class FormPage extends Component<IFormPageProps, IFormPageState> {
  defaultFile: File;
  inputTitleRef: React.RefObject<HTMLInputElement>;
  inputFileRef: React.RefObject<HTMLInputElement>;
  constructor(props: IFormPageProps) {
    super(props);
    this.defaultFile = new File([defaultPic], 'default.png', { type: 'image/png' });
    this.inputTitleRef = React.createRef();
    this.inputFileRef = React.createRef();
    this.state = {
      price: 1,
      description: '',
      imageUrl: defaultPic,
      imageFile: this.defaultFile,
      category: '',
      products: [],
    };
  }

  componentDidMount() {
    this.props.onChangeNamePage('Form Page');
    // console.log(this.state);
  }

  handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ price: Number(event.target.value) });
  };

  handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({ description: event.target.value });
  };

  handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ category: event.target.value });
  };

  handleImageInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        if (this.inputFileRef.current !== null) {
          const imageFile = this.inputFileRef.current.files && this.inputFileRef.current.files[0];
          if (imageFile !== null) {
            this.setState({
              imageUrl: URL.createObjectURL(imageFile),
              imageFile,
            });
          }
        }
      };
      reader.readAsDataURL(event.target.files[0]);
    }
    // setTimeout(() => {
    //   console.log(this.state);
    // }, 1000);
  };

  handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { price, description, imageUrl, category, products } = this.state;
    // const id = Date.now();

    let newTitle = '';
    if (this.inputTitleRef.current) {
      newTitle = this.inputTitleRef.current.value;
      this.inputTitleRef.current.value = '';
    }

    const newProduct = {
      id: Date.now(),
      title: newTitle,
      price,
      description,
      imageUrl,
      category,
    };

    const newProducts = [...products, newProduct];

    this.setState({
      price: 1,
      description: '',
      imageUrl: defaultPic,
      imageFile: this.defaultFile,
      category: '',
      products: newProducts,
    });
    // console.log('submit', this.state);

    this.handleSetDefaultFile();
  };

  handleSetDefaultFile = () => {
    if (this.inputFileRef.current) {
      const dt = new DataTransfer();
      dt.items.add(this.defaultFile);
      this.inputFileRef.current.files = dt.files;
    }
  };

  render() {
    const { price, description, category, products, imageFile } = this.state;
    return (
      <div className="form-page">
        <h3>Form page</h3>
        <form onSubmit={this.handleFormSubmit}>
          <div className="form-input">
            <label htmlFor="title-input">Title:</label>
            <input type="text" id="title-input" ref={this.inputTitleRef} />
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
            <input
              type="file"
              accept="image/jpeg,image/png,image/gif"
              id="image-input"
              onInput={this.handleImageInput}
              ref={this.inputFileRef}
            />
            {imageFile && <span>{imageFile.name}</span>}
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
