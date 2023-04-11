// import { validateDate } from '../components/pages/formPage/Validate';
import { validateDate } from '../components/pages/formPage/Validate';

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
