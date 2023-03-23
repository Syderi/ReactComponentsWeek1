import { RefObject } from 'react';

function validateText(
  ref: React.RefObject<HTMLInputElement> | RefObject<HTMLTextAreaElement> | null,
  regex = ''
) {
  if (ref && ref.current) {
    const firstLetterRegex = /^([A-ZА-Я])/;
    if (
      ref.current.value.match(regex) &&
      ref.current.value.length >= 5 &&
      firstLetterRegex.test(ref.current.value)
    ) {
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

    if (ref.current.value.match(regex) && Number(ref.current.value) > 0) {
      ref.current.style.borderColor = 'gray';
      return true;
    }
    ref.current.style.borderColor = 'red';
  }
  return false;
}

function validateDate(ref: React.RefObject<HTMLInputElement> | null) {
  if (ref && ref.current) {
    const inputDate = new Date(ref.current.value);
    const currentDate = new Date();

    if (isNaN(inputDate.getTime()) || inputDate > currentDate) {
      ref.current.style.borderColor = 'red';
      return false;
    }
    ref.current.style.borderColor = 'gray';
    return true;
  }

  return false;
}

function validateImageFile(ref: React.RefObject<HTMLInputElement>) {
  if (ref && ref.current) {
    const name = ref?.current?.value ?? '';
    if (name.length !== 0) {
      return true;
    }
  }
  return false;
}

function validateProductStatus(
  refNew: React.RefObject<HTMLInputElement>,
  refOld: React.RefObject<HTMLInputElement>
) {
  if (refNew.current?.checked || refOld.current?.checked) return true;
  return false;
}

export { validateText, validatePrice, validateDate, validateImageFile, validateProductStatus };
