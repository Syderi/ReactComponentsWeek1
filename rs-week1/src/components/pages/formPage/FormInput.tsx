import './FormPage.css';
import { IFormInputProps, IFormInputState } from 'components/types/interface';
import React, { Component, RefObject } from 'react';
import { validatePrice, validateDate, validateImageFile, validateProductStatus } from './Validate';
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
  rules: boolean;
  productStatus: string;
  imageFile: FileList;
  category: string;
}

function FormInput({ onChangeProduct }: IFormInputProps) {
  const {
    register,
    handleSubmit,
    reset,
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
    onChangeProduct({
      id: Date.now(),
      title: data.title,
      price: Number(data.price),
      date: data.date,
      productStatus: data.productStatus,
      description: data.description,
      imageUrl: data.title,
      category: data.title,
    });
    reset();
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
            required: 'Error: not value',
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
      <div className="form-input">
        <label htmlFor="price-input">
          Price:
          {errors.price && <span className="form-input-span-error">{errors.price.message}</span>}
        </label>
        <input
          {...register('price', {
            required: 'Error: not value',
            pattern: {
              value: /^[1-9]\d*$/,
              message: 'Error: not correct Price',
            },
          })}
          type="number"
          inputMode="numeric"
          id="price-input"
          placeholder="set a price"
        />
      </div>
      <div className="form-input">
        <label htmlFor="description-input">
          Description:
          {errors.description && (
            <span className="form-input-span-error">{errors.description.message}</span>
          )}
        </label>
        <textarea
          {...register('description', {
            required: 'Error: not value',
            pattern: {
              value: /^[A-ZА-Я][A-ZА-Яa-zа-я]{4,}.*$/,
              message: 'Error: not First letter is capital, 5 characters',
            },
          })}
          id="description-input"
          placeholder="description product: Phone is very..."
        />
      </div>
      {/* <InputImage valid={spanFileValid} forwardRef={this.inputFileRef} imageFile={imageFile} /> */}
      <div className="form-input">
        <label htmlFor="date-input">
          Date of manufacture:
          {errors.date && <span className="form-input-span-error">{errors.date.message}</span>}
        </label>
        <input
          {...register('date', {
            required: 'Error: not date',
            validate: {
              validate: (value) => validateDate(value) || 'Error: product from the future',
            },
          })}
          type="date"
          id="date-input"
        />
      </div>
      <div className="form-input">
        <label htmlFor="rule-input">
          <input
            {...register('rules', {
              required: true,
            })}
            type="checkbox"
            id="rule-input"
            data-testid="rule-input"
          />
          I agree to the posting rules.
          {errors.rules && (
            <span className="form-input-span-error">Error: You must agree to the rules</span>
          )}
        </label>
      </div>
      <InputProductStatus
        error={errors.productStatus}
        register={register('productStatus', { required: true })}
      />
      {/* <InputCategory valid={spancategoryValid} forwardRef={this.inputCategoryRef} /> */}
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

// validate: {
//   acceptedFormat: (files: FileList | null) =>
//     (files && ['image/jpg', 'image/png'].includes(files[0].type)) || 'error',
// },
