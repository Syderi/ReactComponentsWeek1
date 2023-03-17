import { RefObject } from 'react';

function validateText(
  ref: React.RefObject<HTMLInputElement> | RefObject<HTMLTextAreaElement> | null,
  regex = ''
) {
  if (ref && ref.current) {
    if (ref.current.value.match(regex) && ref.current.value.length >= 5) {
      ref.current.style.borderColor = 'gray';
      return true;
    }
    ref.current.style.borderColor = 'red';
  }
  return false;
}

function validatePrice(ref: React.RefObject<HTMLInputElement> | null, regex: RegExp) {
  if (ref && ref.current) {
    ref.current.value = ref.current.value.replace(/\D/g, '');

    if (ref.current.value.match(regex) && +ref.current.value > 0) {
      ref.current.style.borderColor = 'gray';
      return true;
    }
    ref.current.style.borderColor = 'red';
  }
  return false;
}

function validateFirstSubmitButton(ref: HTMLInputElement) {
  if (ref) {
    if (ref.value.length > 0) {
      return true;
    }
  }
  return false;
}

export { validateText, validatePrice, validateFirstSubmitButton };
