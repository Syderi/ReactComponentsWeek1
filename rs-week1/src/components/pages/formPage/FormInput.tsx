import './FormPage.css';
import { IFormCard } from 'components/types/interface';
import React, { Component, RefObject } from 'react';
import {
  validatePrice,
  validateText,
  validateDate,
  validateImageFile,
  validateProductStatus,
} from './Validate';

interface IFormInputProps {
  onChangeProduct: (newProduct: IFormCard) => void;
}

interface IFormInputState {
  imageUrl: string;
  imageFile: File | null;
  spanFileValid: boolean;
  spanPriceValid: boolean;
  spanTitleValid: boolean;
  spanDescriptionValid: boolean;
  spanDateValid: boolean;
  spanProductStatusValid: boolean;
  spanRulesValid: boolean;
}

class FormInput extends Component<IFormInputProps, IFormInputState> {
  formRef: React.RefObject<HTMLFormElement> = React.createRef();
  inputTitleRef: React.RefObject<HTMLInputElement> = React.createRef();
  inputPriceRef: React.RefObject<HTMLInputElement> = React.createRef();
  inputFileRef: React.RefObject<HTMLInputElement> = React.createRef();
  inputCategoryRef: React.RefObject<HTMLSelectElement> = React.createRef();
  inputDescriptionRef: RefObject<HTMLTextAreaElement> = React.createRef();
  inputDateRef: RefObject<HTMLInputElement> = React.createRef();
  inputProductStatusRefNew: RefObject<HTMLInputElement> = React.createRef();
  inputProductStatusRefUsed: RefObject<HTMLInputElement> = React.createRef();
  inputRulesRef: RefObject<HTMLInputElement> = React.createRef();
  statusCardRef: RefObject<HTMLSpanElement> = React.createRef();

  constructor(props: IFormInputProps) {
    super(props);
    this.state = {
      imageUrl: '',
      imageFile: null,
      spanFileValid: true,
      spanPriceValid: true,
      spanTitleValid: true,
      spanDescriptionValid: true,
      spanDateValid: true,
      spanProductStatusValid: true,
      spanRulesValid: true,
    };
  }

  componentDidMount(): void {
    // this.inputRulesRef.current?.click();
  }

  checkValidAllInputs = () => {
    const priceValid = validatePrice(this.inputPriceRef, /^\d+$/);
    const titleValid = validateText(this.inputTitleRef);
    const descriptionValid = validateText(this.inputDescriptionRef);
    const dateValid = validateDate(this.inputDateRef);
    const imageFileValid = validateImageFile(this.inputFileRef);
    const productStatusValid = validateProductStatus(
      this.inputProductStatusRefNew,
      this.inputProductStatusRefUsed
    );
    const rulesValid = this.inputRulesRef.current?.checked ?? false;
    console.log('rulesValid', rulesValid ? 'да' : 'нет');
    this.setState({ spanPriceValid: priceValid });
    this.setState({ spanTitleValid: titleValid });
    this.setState({ spanDescriptionValid: descriptionValid });
    this.setState({ spanDateValid: dateValid });
    this.setState({ spanFileValid: imageFileValid });
    this.setState({ spanProductStatusValid: productStatusValid });
    this.setState({ spanRulesValid: rulesValid });
    if (
      priceValid &&
      titleValid &&
      descriptionValid &&
      dateValid &&
      imageFileValid &&
      productStatusValid
      //  &&
      // rulesValid
    )
      return true;
    return false;
  };

  handleImageInput = () => {
    if (this.inputFileRef.current && this.inputFileRef) {
      const imageFile = this.inputFileRef.current.files?.[0];
      if (imageFile) {
        this.setState({
          imageUrl: URL.createObjectURL(imageFile),
          imageFile,
        });
      }
    }
  };

  handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validForm = this.checkValidAllInputs();

    const { imageUrl } = this.state;

    if (!validForm) {
      return;
    }

    const newTitle = this.inputTitleRef.current?.value ?? '';
    const newDescription = this.inputDescriptionRef.current?.value ?? '';
    const newPrice = this.inputPriceRef.current?.value ?? '';
    const newDate = this.inputDateRef.current?.value ?? '';
    console.log('Data', newDate);

    let newProductStatus = 'new';

    const newSelect = this.inputProductStatusRefNew.current?.checked;
    const usedSelect = this.inputProductStatusRefUsed.current?.checked;

    if (newSelect && !usedSelect && this.inputProductStatusRefNew.current) {
      newProductStatus = this.inputProductStatusRefNew.current?.value;
    } else if (!newSelect && usedSelect && this.inputProductStatusRefUsed.current) {
      newProductStatus = this.inputProductStatusRefUsed.current?.value;
    }

    // console.log('product', newProductStatus);

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
      imageUrl: '',
      imageFile: null,
    });

    this.setDefaultForm();

    if (this.statusCardRef.current) {
      this.statusCardRef.current.textContent = 'Card added';
      this.statusCardRef.current.style.color = 'green';
      setTimeout(() => {
        this.statusCardRef.current!.textContent = '';
        this.statusCardRef.current!.style.color = '';
      }, 5000);
    }
  };

  setDefaultForm = () => {
    if (this.formRef) this.formRef.current?.reset();
    // if (this.inputFileRef.current) this.inputFileRef.current.value = '';
    // if (this.inputProductStatusRefNew.current)
    //   this.inputProductStatusRefNew.current.checked = false;
    // if (this.inputProductStatusRefUsed.current)
    //   this.inputProductStatusRefUsed.current.checked = false;
    // if (this.inputTitleRef.current) this.inputTitleRef.current.value = '';
    // if (this.inputDescriptionRef.current) this.inputDescriptionRef.current.value = '';
    // if (this.inputPriceRef.current) this.inputPriceRef.current.value = '';
    // if (this.inputDateRef.current) this.inputDateRef.current.value = '';
    // if (this.inputRulesRef.current) this.inputRulesRef.current.checked = false;
  };

  render() {
    const {
      imageFile,
      spanFileValid,
      spanPriceValid,
      spanTitleValid,
      spanDescriptionValid,
      spanDateValid,
      spanProductStatusValid,
      spanRulesValid,
    } = this.state;
    return (
      <form onSubmit={this.handleFormSubmit} ref={this.formRef}>
        <div className="form-input">
          <label htmlFor="title-input">
            Title: {!spanTitleValid && <span className="form-input-span-error">Error</span>}
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
            {!spanPriceValid && <span className="form-input-span-error">Error</span>}
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
            {!spanDescriptionValid && <span className="form-input-span-error">Error</span>}
          </label>
          <textarea
            ref={this.inputDescriptionRef}
            id="description-input"
            placeholder="description product: Phone is very..."
          />
        </div>
        <div className="form-input">
          <label htmlFor="image-input">
            Image: {!spanFileValid && <span className="form-input-span-error">Error</span>}
          </label>
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
            Date of manufacture:
            {!spanDateValid && <span className="form-input-span-error">Error</span>}
          </label>
          <input type="date" id="date-input" ref={this.inputDateRef} />
        </div>
        <div className="form-input">
          <label htmlFor="rule-input">
            <input
              type="checkbox"
              id="rule-input"
              data-testid="rule-input"
              ref={this.inputRulesRef}
            />
            I agree to the posting rules.
            {!spanRulesValid && <span className="form-input-span-error">Error</span>}
          </label>
        </div>
        <div className="form-input">
          <div className="radio-label">
            <label>
              Choose product status:
              {!spanProductStatusValid && <span className="form-input-span-error">Error</span>}
            </label>
          </div>
          <div className="radio-buttons">
            <label>
              <input
                type="radio"
                name="productStatus"
                value="new"
                data-testid="new-input"
                ref={this.inputProductStatusRefNew}
              />
              New product
            </label>
            <label>
              <input
                type="radio"
                name="productStatus"
                value="used"
                ref={this.inputProductStatusRefUsed}
              />
              Used product
            </label>
          </div>
        </div>
        <div className="form-input">
          <label htmlFor="category-select">Category:</label>
          <select id="category-select" ref={this.inputCategoryRef}>
            <option disabled></option>
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
