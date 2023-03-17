import { RefObject } from 'react';

function validateText(
  ref: React.RefObject<HTMLInputElement> | RefObject<HTMLTextAreaElement> | null,
  regex = ''
) {
  if (ref && ref.current) {
    if (ref.current.value.match(regex) && ref.current.value.length >= 5) {
      console.log('true');
      ref.current.style.borderColor = 'gray';
      return true;
    }
    ref.current.style.borderColor = 'red';
    console.log('false');
    return false;
  }
}

function validatePrice(ref: React.RefObject<HTMLInputElement> | null, regex = '') {
  if (ref && ref.current) {
    if (ref.current.value.match(regex) && +ref.current.value > 0) {
      console.log('true');
      ref.current.style.borderColor = 'gray';
      return true;
    }
    ref.current.style.borderColor = 'red';
    console.log('false');
    return false;
  }
}

function validateSubmitButtonStatusActive(ref: HTMLInputElement) {
  console.log(ref);
  if (ref) {
    console.log(ref.value.length);
    if (ref.value.length > 0) {
      return true;
    }
    return false;
  }
}

export { validateText, validatePrice, validateSubmitButtonStatusActive };
