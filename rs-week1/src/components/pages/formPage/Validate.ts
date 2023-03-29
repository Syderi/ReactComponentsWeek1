function validatePrice(ref: React.RefObject<HTMLInputElement> | null, regex: RegExp) {
  if (ref && ref.current) {
    if (ref.current.value.match(regex) && Number(ref.current.value) > 0) {
      return true;
    }
  }
  return false;
}

function validateDate(value: string) {
  const inputDate = new Date(value);
  const currentDate = new Date();
  if (isNaN(Date.parse(value))) {
    return false;
  }

  return inputDate < currentDate;
}

export { validatePrice, validateDate };
