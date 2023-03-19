import './FormPage.css';
import { IFormCard } from 'components/types/interface';
import React, { Component, RefObject } from 'react';
import FormCard from './FormCard';
import defaultPic from '../../../assets/img/default.png';
import { validatePrice, validateFirstSubmitButton, validateText, validateDate } from './Validate';

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
  spanDateValid: boolean;
}

class FormPage extends Component<IFormPageProps, IFormPageState> {
  defaultFile: File;
  inputTitleRef: React.RefObject<HTMLInputElement> = React.createRef();
  inputPriceRef: React.RefObject<HTMLInputElement> = React.createRef();
  inputFileRef: React.RefObject<HTMLInputElement> = React.createRef();
  inputCategoryRef: React.RefObject<HTMLSelectElement> = React.createRef();
  inputDescriptionRef: RefObject<HTMLTextAreaElement> = React.createRef();
  inputDateRef: RefObject<HTMLInputElement> = React.createRef();
  inputProductStatusRef: RefObject<HTMLInputElement> = React.createRef();
  statusCardRef: RefObject<HTMLSpanElement> = React.createRef();

  constructor(props: IFormPageProps) {
    super(props);
    this.defaultFile = new File([defaultPic], 'default.png', { type: 'image/png' });
    this.state = {
      imageUrl: defaultPic,
      imageFile: this.defaultFile,
      products: [],
      errorMassege: false,
      buttonSubmitStatusDisabled: true,
      spanPriceValid: false,
      spanTitleValid: false,
      spanDescriptionValid: false,
      spanDateValid: false,
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
    if (this.inputDateRef.current) {
      this.inputDateRef.current.oninput = this.handleInputFirstStart(this.inputDateRef);
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
    if (this.inputDateRef.current) {
      this.inputDateRef.current.removeEventListener(
        'input',
        this.handleInputFirstStart(this.inputDateRef)
      );
    }
    this.setState({ errorMassege: true });
  }

  handleInputFirstStart = (
    ref: React.RefObject<HTMLInputElement> | React.RefObject<HTMLTextAreaElement>
  ) => {
    return () => {
      if (validateFirstSubmitButton(ref.current as HTMLInputElement)) {
        this.setState({ buttonSubmitStatusDisabled: false });
      }
    };
  };

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
    if (this.inputDateRef.current) {
      this.inputDateRef.current.oninput = () => {
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
    if (this.inputDateRef.current) {
      this.inputDateRef.current.removeEventListener('input', () => {
        this.checkValidAllInputs();
      });
    }
  };

  checkValidAllInputs = () => {
    const priceValid = validatePrice(this.inputPriceRef, /^\d+$/);
    const titleValid = validateText(this.inputTitleRef);
    const descriptionValid = validateText(this.inputDescriptionRef);
    const dateValid = validateDate(this.inputDateRef);
    this.setState({ spanPriceValid: priceValid });
    this.setState({ spanTitleValid: titleValid });
    this.setState({ spanDescriptionValid: descriptionValid });
    this.setState({ spanDateValid: dateValid });
    if (priceValid && titleValid && descriptionValid && dateValid) return true;
    return false;
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

    let newDate = '';
    if (this.inputDateRef.current) {
      newDate = this.inputDateRef.current.value;
      this.inputDateRef.current.value = '';
    }

    let newProductStatus = 'new';
    if (this.inputProductStatusRef.current) {
      const checkedProductStatus = this.inputProductStatusRef.current.checked;
      this.inputProductStatusRef.current.checked = true;
      newProductStatus = checkedProductStatus ? 'new' : 'used';
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
      date: newDate,
      productStatus: newProductStatus,
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

  render() {
    const {
      products,
      imageFile,
      errorMassege,
      buttonSubmitStatusDisabled,
      spanPriceValid,
      spanTitleValid,
      spanDescriptionValid,
      spanDateValid,
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
            <label htmlFor="date-input">
              Date of manufacture:{' '}
              {!spanDateValid && errorMassege && (
                <span className="form-input-span-error">Error</span>
              )}
            </label>
            <input
              type="date"
              id="date-input"
              // onInput={this.handleImageInput}
              ref={this.inputDateRef}
            />
          </div>
          <div className="form-input">
            <label>
              <input type="checkbox" required /> I agree to the posting rules.
            </label>
          </div>
          <div className="form-input">
            <div className="radio-label">
              <label>Choose product status:</label>
            </div>
            <div className="radio-buttons">
              <label>
                <input
                  type="radio"
                  name="productStatus"
                  value="new"
                  defaultChecked
                  ref={this.inputProductStatusRef}
                />
                New product
              </label>
              <label>
                <input
                  type="radio"
                  name="productStatus"
                  value="used"
                  // ref={this.inputProductStatusRef}
                />
                Used product
              </label>
            </div>
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
