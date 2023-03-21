import './FormPage.css';
import { IFormCard } from 'components/types/interface';
import React, { Component, RefObject } from 'react';
import defaultPic from '../../../assets/img/default.png';
import { validatePrice, validateText, validateDate } from './Validate';

interface IFormInputProps {
  onChangeProduct: (newProduct: IFormCard) => void;
}

interface IFormInputState {
  imageUrl: string;
  imageFile: File | null;
  errorMassege: boolean;
  spanPriceValid: boolean;
  spanTitleValid: boolean;
  spanDescriptionValid: boolean;
  spanDateValid: boolean;
}

class FormInput extends Component<IFormInputProps, IFormInputState> {
  defaultFile: File;
  inputTitleRef: React.RefObject<HTMLInputElement> = React.createRef();
  inputPriceRef: React.RefObject<HTMLInputElement> = React.createRef();
  inputFileRef: React.RefObject<HTMLInputElement> = React.createRef();
  inputCategoryRef: React.RefObject<HTMLSelectElement> = React.createRef();
  inputDescriptionRef: RefObject<HTMLTextAreaElement> = React.createRef();
  inputDateRef: RefObject<HTMLInputElement> = React.createRef();
  inputProductStatusRef: RefObject<HTMLInputElement> = React.createRef();
  statusCardRef: RefObject<HTMLSpanElement> = React.createRef();

  constructor(props: IFormInputProps) {
    super(props);
    this.defaultFile = new File([defaultPic], 'default.png', { type: 'image/png' });
    this.state = {
      imageUrl: defaultPic,
      imageFile: this.defaultFile,
      errorMassege: false,
      spanPriceValid: false,
      spanTitleValid: false,
      spanDescriptionValid: false,
      spanDateValid: false,
    };
  }

  addOnChangeListenerInputs = () => {
    const inputRefs = [
      this.inputPriceRef,
      this.inputTitleRef,
      this.inputDescriptionRef,
      this.inputDateRef,
    ];

    inputRefs.forEach((ref) => {
      if (ref.current) {
        ref.current.oninput = () => {
          this.checkValidAllInputs();
        };
      }
    });
  };

  removeOnChangeListenerInputs = () => {
    const inputRefs = [
      this.inputPriceRef,
      this.inputTitleRef,
      this.inputDescriptionRef,
      this.inputDateRef,
    ];

    inputRefs.forEach((ref) => {
      if (ref.current) {
        ref.current.oninput = null;
      }
    });
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

  handleImageInput = () => {
    // if (event.target.files) {
    // const reader = new FileReader();
    // reader.onload = () => {
    if (this.inputFileRef.current && this.inputFileRef) {
      const imageFile = this.inputFileRef.current?.files?.[0];
      if (imageFile) {
        this.setState({
          imageUrl: URL.createObjectURL(imageFile),
          imageFile,
        });
      }
    }
    // };
    // reader.readAsDataURL(event.target.files[0]);
    // }
  };

  handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // console.log('111111111', this.inputFileRef.current?.value);
    // if (this.inputFileRef.current) this.inputFileRef.current.value = defaultPic;
    event.preventDefault();
    this.addOnChangeListenerInputs();
    const validForm = this.checkValidAllInputs();

    const { imageUrl } = this.state;

    if (!validForm) {
      this.setState({ errorMassege: true });
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

    this.props.onChangeProduct(newProduct);

    this.setState({
      imageUrl: defaultPic,
      imageFile: this.defaultFile,
      errorMassege: false,
      spanPriceValid: false,
      spanTitleValid: false,
      spanDescriptionValid: false,
    });

    this.handleSetDefaultFile();
    this.removeOnChangeListenerInputs();

    if (this.statusCardRef.current) {
      this.statusCardRef.current.textContent = 'Card added';
      setTimeout(() => {
        this.statusCardRef.current!.textContent = '';
      }, 5000);
    }
  };

  handleSetDefaultFile = () => {
    // if (this.inputFileRef.current) {
    // const dt = new DataTransfer();
    // dt.items.add(this.defaultFile);
    // this.inputFileRef.current.files = dt.files;
    if (this.inputFileRef.current) this.inputFileRef.current.value = '';
    // }
  };

  render() {
    const {
      imageFile,
      errorMassege,
      spanPriceValid,
      spanTitleValid,
      spanDescriptionValid,
      spanDateValid,
    } = this.state;
    return (
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
            placeholder="name product: Phone..."
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
            placeholder="description product: Phone is very..."
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
            {!spanDateValid && errorMassege && <span className="form-input-span-error">Error</span>}
          </label>
          <input type="date" id="date-input" ref={this.inputDateRef} />
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
              <input type="radio" name="productStatus" value="used" />
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
          <button type="submit">Submit CARD</button>
        </div>
      </form>
    );
  }
}

export default FormInput;
