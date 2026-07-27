import {
  ValidationError,
  isValidationError,
  validatePositiveInt,
  validateString,
  validateEmail,
  validateOrderStatus,
  validateReviewRating,
} from '../validation';

describe('ValidationError', () => {
  it('has correct name and field', () => {
    const err = new ValidationError('price', 'price must be positive');
    expect(err.name).toBe('ValidationError');
    expect(err.field).toBe('price');
    expect(err.message).toBe('price must be positive');
  });
});

describe('isValidationError', () => {
  it('returns true for ValidationError', () => {
    expect(isValidationError(new ValidationError('x', 'msg'))).toBe(true);
  });

  it('returns false for regular Error', () => {
    expect(isValidationError(new Error('msg'))).toBe(false);
  });

  it('returns false for non-errors', () => {
    expect(isValidationError(null)).toBe(false);
    expect(isValidationError('string')).toBe(false);
  });
});

describe('validatePositiveInt', () => {
  it('passes for positive integers', () => {
    expect(validatePositiveInt(1, 'id')).toBeUndefined();
    expect(validatePositiveInt('5', 'id')).toBeUndefined();
  });

  it('fails for zero', () => {
    expect(validatePositiveInt(0, 'id')).toBeInstanceOf(ValidationError);
  });

  it('fails for negative numbers', () => {
    expect(validatePositiveInt(-1, 'id')).toBeInstanceOf(ValidationError);
  });

  it('fails for floats', () => {
    expect(validatePositiveInt(1.5, 'id')).toBeInstanceOf(ValidationError);
  });

  it('fails for non-numeric strings', () => {
    expect(validatePositiveInt('abc', 'id')).toBeInstanceOf(ValidationError);
  });
});

describe('validateString', () => {
  it('passes for non-empty string', () => {
    expect(validateString('hello', 'name')).toBeUndefined();
  });

  it('fails for empty string', () => {
    expect(validateString('', 'name')).toBeInstanceOf(ValidationError);
  });

  it('fails for whitespace-only', () => {
    expect(validateString('   ', 'name')).toBeInstanceOf(ValidationError);
  });

  it('fails for string exceeding maxLen', () => {
    expect(validateString('a'.repeat(101), 'name', 100)).toBeInstanceOf(ValidationError);
  });

  it('fails for non-string', () => {
    expect(validateString(42, 'name')).toBeInstanceOf(ValidationError);
  });
});

describe('validateEmail', () => {
  it('passes for valid email', () => {
    expect(validateEmail('user@example.com')).toBeUndefined();
  });

  it('fails for invalid email', () => {
    expect(validateEmail('notanemail')).toBeInstanceOf(ValidationError);
    expect(validateEmail('@domain.com')).toBeInstanceOf(ValidationError);
    expect(validateEmail('user@')).toBeInstanceOf(ValidationError);
  });
});

describe('validateOrderStatus', () => {
  it('passes for valid statuses', () => {
    const valid = ['pending', 'processing', 'shipped', 'completed', 'cancelled'];
    valid.forEach((s) => expect(validateOrderStatus(s)).toBeUndefined());
  });

  it('fails for invalid status', () => {
    expect(validateOrderStatus('invalid')).toBeInstanceOf(ValidationError);
    expect(validateOrderStatus('')).toBeInstanceOf(ValidationError);
  });
});

describe('validateReviewRating', () => {
  it('passes for 1-5', () => {
    [1, 2, 3, 4, 5].forEach((r) => expect(validateReviewRating(r)).toBeUndefined());
  });

  it('fails for 0 and 6', () => {
    expect(validateReviewRating(0)).toBeInstanceOf(ValidationError);
    expect(validateReviewRating(6)).toBeInstanceOf(ValidationError);
  });

  it('fails for non-integers', () => {
    expect(validateReviewRating(2.5)).toBeInstanceOf(ValidationError);
  });
});
