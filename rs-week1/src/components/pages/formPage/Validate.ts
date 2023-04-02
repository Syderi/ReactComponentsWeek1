function validateDate(value: string) {
  const inputDate = new Date(value);
  const currentDate = new Date();
  if (isNaN(Date.parse(value))) {
    return false;
  }

  return inputDate < currentDate;
}

export { validateDate };
