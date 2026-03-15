import { isError, toErrorMessage } from '../error-utils';

describe('isError', () => {
  it('returns true for Error instances', () => {
    expect(isError(new Error('msg'))).toBe(true);
    expect(isError(new TypeError('type error'))).toBe(true);
  });

  it('returns false for non-Error values', () => {
    expect(isError(null)).toBe(false);
    expect(isError(undefined)).toBe(false);
    expect(isError('string')).toBe(false);
    expect(isError(42)).toBe(false);
    expect(isError({ message: 'obj' })).toBe(false);
  });
});

describe('toErrorMessage', () => {
  it('extracts message from Error', () => {
    expect(toErrorMessage(new Error('something went wrong'))).toBe('something went wrong');
  });

  it('returns string as-is', () => {
    expect(toErrorMessage('direct string')).toBe('direct string');
  });

  it('extracts message from plain object with message', () => {
    expect(toErrorMessage({ message: 'obj error' })).toBe('obj error');
  });

  it('returns fallback for null', () => {
    expect(toErrorMessage(null)).toBe('An unexpected error occurred');
  });

  it('returns fallback for undefined', () => {
    expect(toErrorMessage(undefined)).toBe('An unexpected error occurred');
  });

  it('returns fallback for number', () => {
    expect(toErrorMessage(42)).toBe('An unexpected error occurred');
  });
});
