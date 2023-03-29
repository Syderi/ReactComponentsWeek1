import { RefObject } from 'react';
import { validatePrice, validateDate } from '../components/pages/formPage/Validate';

describe('validatePrice', () => {
  test('returns true if input value matches regex and is greater than 0', () => {
    const ref = { current: { value: '123' } };
    expect(validatePrice(ref as RefObject<HTMLInputElement>, /\d+/)).toBe(true);
  });

  test('returns false if input value does not match regex or is less than or equal to 0', () => {
    const ref = { current: { value: '0' } };
    expect(validatePrice(ref as RefObject<HTMLInputElement>, /\d+/)).toBe(false);
  });
});

describe('validateDate', () => {
  test('returns true if input date is valid and not in the future', () => {
    const value = '2022-01-01';
    expect(validateDate(value)).toBe(true);
  });

  test('returns false if input date is invalid or in the future', () => {
    const value = 'invalid-date';
    expect(validateDate(value)).toBe(false);
  });
});
