import './FormPage.css';
import { IFormCard } from 'components/types/interface';
import React, { Component, RefObject } from 'react';
import FormCard from './FormCard';
import defaultPic from '../../../assets/img/default.png';
import { validatePrice, validateFirstSubmitButton, validateText } from './Validate';

interface IFormPageProps {
  onChangeNamePage: (namePage: string) => void;
}

interface IFormPageState {
  imageUrl: string;
  imageFile: File | null;
  products: IFormCard[];
  errorMassege: boolean;
  buttonSubmitStatusDisabled: boolean;
  spanPriceValid: boolean;
  spanTitleValid: boolean;
  spanDescriptionValid: boolean;
}

class FormPage extends Component<IFormPageProps, IFormPageState> {
  defaultFile: File;
  inputTitleRef: React.RefObject<HTMLInputElement>;
  inputPriceRef: React.RefObject<HTMLInputElement>;
  inputFileRef: React.RefObject<HTMLInputElement>;
  inputCategoryRef: React.RefObject<HTMLSelectElement>;
  inputDescriptionRef: RefObject<HTMLTextAreaElement>;
  statusCardRef: RefObject<HTMLSpanElement>;

  constructor(props: IFormPageProps) {
    super(props);
    this.defaultFile = new File([defaultPic], 'default.png', { type: 'image/png' });
    this.inputTitleRef = React.createRef();
    this.inputPriceRef = React.createRef();
    this.inputFileRef = React.createRef();
    this.inputCategoryRef = React.createRef();
    this.inputDescriptionRef = React.createRef();
    this.statusCardRef = React.createRef();
    this.state = {
      imageUrl: defaultPic,
      imageFile: this.defaultFile,
      products: [],
      errorMassege: false,
      buttonSubmitStatusDisabled: true,
      spanPriceValid: false,
      spanTitleValid: false,
      spanDescriptionValid: false,
    };
  }

  componentDidMount() {
    this.props.onChangeNamePage('Form Page');
    this.addFirstListenerInputs();
  }

  componentDidUpdate(prevProps: IFormPageProps, prevState: IFormPageState) {
    const { spanDescriptionValid, spanPriceValid, spanTitleValid } = this.state;

    if (
      spanDescriptionValid !== prevState.spanDescriptionValid ||
      spanPriceValid !== prevState.spanPriceValid ||
      spanTitleValid !== prevState.spanTitleValid
    ) {
      if (spanDescriptionValid && spanPriceValid && spanTitleValid) {
        this.setState({ buttonSubmitStatusDisabled: false });
      } else {
        this.setState({ buttonSubmitStatusDisabled: true });
      }
    }
  }

  addFirstListenerInputs = () => {
    if (this.inputPriceRef.current) {
      this.inputPriceRef.current.oninput = this.handleInputFirstStart(this.inputPriceRef);
    }
    if (this.inputTitleRef.current) {
      this.inputTitleRef.current.oninput = this.handleInputFirstStart(this.inputTitleRef);
    }
    if (this.inputDescriptionRef.current) {
      this.inputDescriptionRef.current.oninput = this.handleInputFirstStart(
        this.inputDescriptionRef
      );
    }
    this.setState({ errorMassege: false });
  };

  removeFirstListenerInputs() {
    if (this.inputPriceRef.current) {
      this.inputPriceRef.current.removeEventListener(
        'input',
        this.handleInputFirstStart(this.inputPriceRef)
      );
    }
    if (this.inputTitleRef.current) {
      this.inputTitleRef.current.removeEventListener(
        'input',
        this.handleInputFirstStart(this.inputTitleRef)
      );
    }
    if (this.inputDescriptionRef.current) {
      this.inputDescriptionRef.current.removeEventListener(
        'input',
        this.handleInputFirstStart(this.inputDescriptionRef)
      );
    }
    this.setState({ errorMassege: true });
  }

  addOnChangeListenerInputs = () => {
    if (this.inputPriceRef.current) {
      this.inputPriceRef.current.oninput = () => {
        this.checkValidAllInputs();
      };
    }
    if (this.inputTitleRef.current) {
      this.inputTitleRef.current.oninput = () => {
        this.checkValidAllInputs();
      };
    }
    if (this.inputDescriptionRef.current) {
      this.inputDescriptionRef.current.oninput = () => {
        this.checkValidAllInputs();
      };
    }
  };

  removeOnChangeListenerInputs = () => {
    if (this.inputPriceRef.current) {
      this.inputPriceRef.current.removeEventListener('input', () => {
        this.checkValidAllInputs();
      });
    }
    if (this.inputTitleRef.current) {
      this.inputTitleRef.current.removeEventListener('input', () => {
        this.checkValidAllInputs();
      });
    }
    if (this.inputDescriptionRef.current) {
      this.inputDescriptionRef.current.removeEventListener('input', () => {
        this.checkValidAllInputs();
      });
    }
  };

  checkValidAllInputs = () => {
    const priceValid = validatePrice(this.inputPriceRef, /^\d+$/);
    const titleValid = validateText(this.inputTitleRef);
    const descriptionValid = validateText(this.inputDescriptionRef);
    this.setState({ spanPriceValid: priceValid });
    this.setState({ spanTitleValid: titleValid });
    this.setState({ spanDescriptionValid: descriptionValid });
    if (priceValid && titleValid && descriptionValid) return true;
    return false;
  };

  handleInputFirstStart = (
    ref: React.RefObject<HTMLInputElement> | React.RefObject<HTMLTextAreaElement>
  ) => {
    return () => {
      if (validateFirstSubmitButton(ref.current as HTMLInputElement)) {
        this.setState({ buttonSubmitStatusDisabled: false });
      }
    };
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
  };

  handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.removeFirstListenerInputs();
    this.addOnChangeListenerInputs();

    const validForm = this.checkValidAllInputs();

    const { imageUrl, products } = this.state;

    if (!validForm) {
      this.setState({ buttonSubmitStatusDisabled: true });
      return;
    }

    let newTitle = '';
    if (this.inputTitleRef.current) {
      newTitle = this.inputTitleRef.current.value;
      this.inputTitleRef.current.value = '';
    }

    let newDescription = '';
    if (this.inputDescriptionRef.current) {
      newDescription = this.inputDescriptionRef.current.value;
      this.inputDescriptionRef.current.value = '';
    }

    let newPrice = '';
    if (this.inputPriceRef.current) {
      newPrice = this.inputPriceRef.current.value;
      this.inputPriceRef.current.value = '';
    }

    let newCategory = '';
    if (this.inputCategoryRef.current) {
      newCategory = this.inputCategoryRef.current.value;
      this.inputCategoryRef.current.value = 'smartphones';
    }

    const newProduct = {
      id: Date.now(),
      title: newTitle,
      price: Number(newPrice),
      description: newDescription,
      imageUrl,
      category: newCategory,
    };

    const newProducts = [...products, newProduct];

    this.setState({
      imageUrl: defaultPic,
      imageFile: this.defaultFile,
      products: newProducts,
    });

    this.handleSetDefaultFile();
    this.addFirstListenerInputs();
    this.removeOnChangeListenerInputs();
    this.setState({ buttonSubmitStatusDisabled: true });
    this.setState({ spanPriceValid: false });
    this.setState({ spanTitleValid: false });
    this.setState({ spanDescriptionValid: false });
    if (this.statusCardRef.current) {
      this.statusCardRef.current.textContent = 'Card added';
      setTimeout(() => {
        this.statusCardRef.current!.textContent = '';
      }, 5000);
    }
  };

  handleSetDefaultFile = () => {
    if (this.inputFileRef.current) {
      const dt = new DataTransfer();
      dt.items.add(this.defaultFile);
      this.inputFileRef.current.files = dt.files;
    }
  };

  // handleInputPrice = () => {
  //   if (this.inputPriceRef.current) {
  //     this.inputPriceRef.current.value = this.inputPriceRef.current.value.replace(/\D/g, '');
  //   }
  //   // const input = event.currentTarget;
  //   // input.value = input.value.replace(/\D/g, '');
  // };

  render() {
    const {
      products,
      imageFile,
      errorMassege,
      buttonSubmitStatusDisabled,
      spanPriceValid,
      spanTitleValid,
      spanDescriptionValid,
    } = this.state;
    return (
      <div className="form-page">
        <h3>Form page</h3>
        <form onSubmit={this.handleFormSubmit}>
          <div className="form-input">
            <label htmlFor="title-input">
              Title:{' '}
              {!spanTitleValid && errorMassege && (
                <span className="form-input-span-error">Error</span>
              )}
            </label>
            <input
              type="text"
              id="title-input"
              ref={this.inputTitleRef}
              placeholder="name product"
            />
          </div>
          <div className="form-input">
            <label htmlFor="price-input">
              Price:
              {!spanPriceValid && errorMassege && (
                <span className="form-input-span-error">Error</span>
              )}
            </label>
            <input
              type="number"
              inputMode="numeric"
              id="price-input"
              ref={this.inputPriceRef}
              placeholder="set a price"
              // onInput={this.handleInputPrice}
            />
          </div>
          <div className="form-input">
            <label htmlFor="description-input">
              Description:{' '}
              {!spanDescriptionValid && errorMassege && (
                <span className="form-input-span-error">Error</span>
              )}
            </label>
            <textarea
              ref={this.inputDescriptionRef}
              id="description-input"
              placeholder="description product"
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
            <select id="category-select" ref={this.inputCategoryRef}>
              <option value="smartphones">smartphones</option>
              <option value="laptops">laptops</option>
              <option value="fragrances">fragrances</option>
            </select>
          </div>
          <div className="form-input">
            <label htmlFor="category-select">
              Status: <span ref={this.statusCardRef}></span>
            </label>
            <button type="submit" disabled={buttonSubmitStatusDisabled}>
              Submit
            </button>
          </div>
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
