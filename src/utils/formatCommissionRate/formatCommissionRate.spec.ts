import { describe, it, expect } from 'vitest';
import { formatCommissionRate } from './formatCommissionRate';

describe('formatCommissionRate', () => {
  it('should format a number as a percent string with default options', () => {
    expect(formatCommissionRate(0.1234)).toBe('12.34%');
  });

  it('should format a string input as a percent string', () => {
    expect(formatCommissionRate('0.5')).toBe('50%');
  });

  it('should return "0%" when the input is zero', () => {
    expect(formatCommissionRate(0)).toBe('0%');
  });

  it('should return a negative percent string for negative input', () => {
    expect(formatCommissionRate(-0.25)).toBe('-25%');
  });

  it('should use the provided locale for formatting', () => {
    expect(formatCommissionRate(0.1234, { locale: 'en-US' })).toBe('12.34%');
  });

  it('should use the maximumFractionDigits option for formatting', () => {
    expect(formatCommissionRate(0.1234, { maximumFractionDigits: 1 })).toBe('12.3%');
  });

  it('should use the minimumFractionDigits option for formatting', () => {
    expect(formatCommissionRate(0.5, { minimumFractionDigits: 2 })).toBe('50.00%');
  });

  it('should return "NaN" for NaN input', () => {
    expect(formatCommissionRate(NaN)).toBe('NaN');
  });

  it('should return the custom fallbackValue for NaN input', () => {
    expect(formatCommissionRate(NaN, { fallbackValue: 'N/A' })).toBe('N/A');
  });

  it('should return an empty string for undefined input by default', () => {
    expect(formatCommissionRate(undefined as any)).toBe('');
  });

  it('should return the custom fallbackValue for undefined input', () => {
    expect(formatCommissionRate(undefined as any, { fallbackValue: 'N/A' })).toBe('N/A');
  });

  it('should return an empty string for null input by default', () => {
    expect(formatCommissionRate(null as any)).toBe('');
  });

  it('should return the custom fallbackValue for null input', () => {
    expect(formatCommissionRate(null as any, { fallbackValue: 'N/A' })).toBe('N/A');
  });

  it('should return an empty string for empty string input by default', () => {
    expect(formatCommissionRate('')).toBe('');
  });

  it('should return the custom fallbackValue for empty string input', () => {
    expect(formatCommissionRate('', { fallbackValue: 'N/A' })).toBe('N/A');
  });

  it('should return "NaN" for invalid string input', () => {
    expect(formatCommissionRate('invalid')).toBe('NaN');
  });

  it('should return the custom fallbackValue for invalid string input', () => {
    expect(formatCommissionRate('invalid', { fallbackValue: 'N/A' })).toBe('N/A');
  });

  it('should format large numbers as percent strings', () => {
    expect(formatCommissionRate(1.5)).toBe('150%');
  });

  it('should format very small numbers as percent strings', () => {
    expect(formatCommissionRate(0.001)).toBe('0.1%');
  });

  it('should apply all options together', () => {
    expect(
      formatCommissionRate(0.123456, {
        locale: 'en-US',
        maximumFractionDigits: 2,
        minimumFractionDigits: 1,
        fallbackValue: 'N/A',
      }),
    ).toBe('12.35%');
  });

  it('should round the result with maximumFractionDigits', () => {
    expect(formatCommissionRate(0.123456, { maximumFractionDigits: 2 })).toBe('12.35%');
  });

  it('should pad with zeros when minimumFractionDigits is higher', () => {
    expect(formatCommissionRate(0.5, { minimumFractionDigits: 3 })).toBe('50.000%');
  });

  it('should format using de-DE locale with comma and space', () => {
    const result = formatCommissionRate(0.1234, { locale: 'de-DE' });
    // German locale uses comma as decimal separator and may include a space before %
    expect(result.replace(/\s/g, '')).toBe('12,34%');
  });
});
