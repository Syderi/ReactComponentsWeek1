import { RefObject } from 'react';

// function validateText(
//   ref: React.RefObject<HTMLInputElement> | RefObject<HTMLTextAreaElement> | null,
//   regex = ''
// ) {
//   if (ref && ref.current) {
//     const firstLetterRegex = /^([A-ZА-Я])/;
//     if (
//       ref.current.value.match(regex) &&
//       ref.current.value.length >= 5 &&
//       firstLetterRegex.test(ref.current.value)
//     ) {
//       return true;
//     }
//   }
//   return false;
// }

// function validateText(value: string) {
//   console.log(value.length);
//   if (!value.trim() || value === '') {
//     return "Error1: title can't be empty";
//   }
//   if (!/^[A-ZА-Я][A-ZА-Яa-zа-я]{4,}.*$/.test(value)) {
//     return 'Error2: not First letter is capital, 5 characters';
//   }
// }

function validatePrice(ref: React.RefObject<HTMLInputElement> | null, regex: RegExp) {
  if (ref && ref.current) {
    if (ref.current.value.match(regex) && Number(ref.current.value) > 0) {
      return true;
    }
  }
  return false;
}

// function validateDate(ref: React.RefObject<HTMLInputElement> | null) {
//   if (ref && ref.current) {
//     const inputDate = new Date(ref.current.value);
//     const currentDate = new Date();

//     if (isNaN(inputDate.getTime()) || inputDate > currentDate) {
//       return false;
//     }
//     return true;
//   }

//   return false;
// }
function validateDate(value: string) {
  const inputDate = new Date(value);
  const currentDate = new Date();
  if (isNaN(Date.parse(value))) {
    return false;
  }

  return inputDate < currentDate;
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

export { validatePrice, validateDate, validateImageFile, validateProductStatus };
