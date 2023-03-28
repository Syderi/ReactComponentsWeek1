import './FormPage.css';
import { IFormInputProps, IFormInputState } from 'components/types/interface';
import React, { Component, RefObject } from 'react';
import {
  validatePrice,
  validateText,
  validateDate,
  validateImageFile,
  validateProductStatus,
} from './Validate';
import { Ecategory } from '../../types/enum';
import InputCategory from './InputComponents/InputCategory';
import InputProductStatus from './InputComponents/InputProductStatus';
import InputImage from './InputComponents/InputImage';
import { useForm } from 'react-hook-form';

interface FormData {
  title: string;
  price: number;
  description: string;
  date: string;
  productStatus: string;
  imageFile: FileList;
  category: string;
}

function FormInput({ onChangeProduct }: IFormInputProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ mode: 'onSubmit', reValidateMode: 'onSubmit' });
  //  const checkValidAllInputs = () => {
  //     const priceValid = validatePrice(this.inputPriceRef, /^\d+$/);
  //     const titleValid = validateText(this.inputTitleRef);
  //     const descriptionValid = validateText(this.inputDescriptionRef);
  //     const dateValid = validateDate(this.inputDateRef);
  //     const imageFileValid = validateImageFile(this.inputFileRef);
  //     const categoryValid = !!Object.values(Ecategory).find(
  //       (cat) => cat === this.inputCategoryRef.current?.value
  //     );
  //     const productStatusValid = validateProductStatus(
  //       this.inputProductStatusRefNew,
  //       this.inputProductStatusRefUsed
  //     );
  //     const rulesValid = this.inputRulesRef.current?.checked ?? false;
  //     this.setState({ spanPriceValid: priceValid });
  //     this.setState({ spanTitleValid: titleValid });
  //     this.setState({ spanDescriptionValid: descriptionValid });
  //     this.setState({ spanDateValid: dateValid });
  //     this.setState({ spanFileValid: imageFileValid });
  //     this.setState({ spancategoryValid: categoryValid });
  //     this.setState({ spanProductStatusValid: productStatusValid });
  //     this.setState({ spanRulesValid: rulesValid });
  //     if (
  //       priceValid &&
  //       titleValid &&
  //       descriptionValid &&
  //       dateValid &&
  //       imageFileValid &&
  //       categoryValid &&
  //       productStatusValid &&
  //       rulesValid
  //     ) {
  //       this.setState({ statusValid: true });
  //       return true;
  //     }
  //     return false;
  //   };

  // getImageInput = () => {
  //   let url = '';
  //   if (this.inputFileRef.current && this.inputFileRef) {
  //     const imageFile = this.inputFileRef.current.files?.[0];
  //     if (imageFile) {
  //       url = URL.createObjectURL(imageFile);
  //       this.setState({
  //         imageUrl: url,
  //         imageFile,
  //       });
  //     }
  //   }
  //   return url;
  // };

  const onSubmit = (data: FormData) => {
    console.log('data', data);
    // event.preventDefault();
    // const imageUrl = this.getImageInput();
    // const validForm = this.checkValidAllInputs();

    // if (!validForm) return;

    // const newTitle = this.inputTitleRef.current?.value ?? '';
    // const newDescription = this.inputDescriptionRef.current?.value ?? '';
    // const newPrice = this.inputPriceRef.current?.value ?? '';
    // const newDate = this.inputDateRef.current?.value ?? '';
    // const newSelect = this.inputProductStatusRefNew.current?.checked;
    // const usedSelect = this.inputProductStatusRefUsed.current?.checked;

    // let newProductStatus = '';

    // if (newSelect && !usedSelect && this.inputProductStatusRefNew.current) {
    //   newProductStatus = this.inputProductStatusRefNew.current?.value;
    // } else if (!newSelect && usedSelect && this.inputProductStatusRefUsed.current) {
    //   newProductStatus = this.inputProductStatusRefUsed.current?.value;
    // }

    // const newCategory = this.inputCategoryRef.current?.value ?? '';

    // const newProduct = {
    //   id: Date.now(),
    //   title: newTitle,
    //   price: Number(newPrice),
    //   date: newDate,
    //   productStatus: newProductStatus,
    //   description: newDescription,
    //   imageUrl,
    //   category: newCategory,
    // };

    // this.props.onChangeProduct(newProduct);

    // this.setDefaultForm();

    // setTimeout(() => {
    //   this.setState({ statusValid: false });
    // }, 5000);
  };

  // setDefaultForm = () => {
  //   if (this.formRef) this.formRef.current?.reset();
  //   this.setState({
  //     imageUrl: '',
  //     imageFile: null,
  //   });
  // };

  // const {
  //   imageFile,
  //   spanFileValid,
  //   spanPriceValid,
  //   spanTitleValid,
  //   spancategoryValid,
  //   spanDescriptionValid,
  //   spanDateValid,
  //   spanProductStatusValid,
  //   spanRulesValid,
  //   statusValid,
  // } = this.state;
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-input">
        <label htmlFor="title-input">
          Title:{' '}
          {errors.title && <span className="form-input-span-error">{errors.title.message}</span>}
        </label>
        <input
          {...register('title', {
            required: true,
            pattern: {
              value: /^[A-ZА-Я][A-ZА-Яa-zа-я]{4,}.*$/,
              message: 'Error: not First letter is capital, 5 characters',
            },
          })}
          type="text"
          id="title-input"
          placeholder="name product: Phone..."
        />
      </div>
      {/* <div className="form-input">
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
          Description:
          {!spanDescriptionValid && (
            <span className="form-input-span-error">
              Error: First letter is capital, 5 characters
            </span>
          )}
        </label>
        <textarea
          ref={this.inputDescriptionRef}
          id="description-input"
          placeholder="description product: Phone is very..."
        />
      </div>
      <InputImage valid={spanFileValid} forwardRef={this.inputFileRef} imageFile={imageFile} />
      <div className="form-input">
        <label htmlFor="date-input">
          Date of manufacture:
          {!spanDateValid && (
            <span className="form-input-span-error">Error: No date or product from the future</span>
          )}
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
      <InputProductStatus
        valid={spanProductStatusValid}
        forwardRefNew={this.inputProductStatusRefNew}
        forwardRefUsed={this.inputProductStatusRefUsed}
      />
      <InputCategory valid={spancategoryValid} forwardRef={this.inputCategoryRef} /> */}
      <div className="form-input">
        <label htmlFor="category-select">
          {/* Status: {statusValid && <span style={{ color: 'green' }}>Card added</span>} */}
        </label>
        <button type="submit">Submit CARD</button>
      </div>
    </form>
  );
}

export default FormInput;
