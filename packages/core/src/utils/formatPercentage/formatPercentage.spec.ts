import { describe, expect, it } from 'vitest';

import { type FormatPercentageOptions, formatPercentage } from './formatPercentage';

describe('formatPercentage', () => {
  it('should format a number as percentage with default options', () => {
    expect(formatPercentage(0.5)).toBe('50%');
    expect(formatPercentage(0.123)).toBe('12.3%');
    expect(formatPercentage(1)).toBe('100%');
    expect(formatPercentage(0)).toBe('0%');
  });

  it('should format a string number as percentage', () => {
    expect(formatPercentage('0.5')).toBe('50%');
    expect(formatPercentage('0.123')).toBe('12.3%');
    expect(formatPercentage('1')).toBe('100%');
    expect(formatPercentage('0')).toBe('0%');
  });

  it('should use custom locale', () => {
    const options: FormatPercentageOptions = { locale: 'en-US' };
    expect(formatPercentage(0.5, options)).toBe('50%');
    expect(formatPercentage(0.123, options)).toBe('12.3%');
  });

  it('should respect maximumFractionDigits', () => {
    const options: FormatPercentageOptions = { maximumFractionDigits: 2 };
    expect(formatPercentage(0.1234, options)).toBe('12.34%');
    expect(formatPercentage(0.5, options)).toBe('50%');
  });

  it('should respect minimumFractionDigits', () => {
    const options: FormatPercentageOptions = { minimumFractionDigits: 2 };
    expect(formatPercentage(0.5, options)).toBe('50.00%');
    expect(formatPercentage(0.123, options)).toBe('12.30%');
  });

  it('should combine maximumFractionDigits and minimumFractionDigits', () => {
    const options: FormatPercentageOptions = {
      maximumFractionDigits: 3,
      minimumFractionDigits: 2,
    };
    expect(formatPercentage(0.5, options)).toBe('50.00%');
    expect(formatPercentage(0.1234, options)).toBe('12.34%');
  });

  it('should return fallback for null values', () => {
    const options: FormatPercentageOptions = { fallback: 'N/A' };
    expect(formatPercentage(null as any, options)).toBe('N/A');
  });

  it('should return fallback for undefined values', () => {
    const options: FormatPercentageOptions = { fallback: 'N/A' };
    expect(formatPercentage(undefined as any, options)).toBe('N/A');
  });

  it('should return fallback for empty string', () => {
    const options: FormatPercentageOptions = { fallback: 'N/A' };
    expect(formatPercentage('', options)).toBe('N/A');
  });

  it('should return default fallback for null values when no fallback provided', () => {
    expect(formatPercentage(null as any)).toBe('-');
  });

  it('should return default fallback for undefined values when no fallback provided', () => {
    expect(formatPercentage(undefined as any)).toBe('-');
  });

  it('should return default fallback for empty string when no fallback provided', () => {
    expect(formatPercentage('')).toBe('-');
  });

  it('should return fallback for NaN values', () => {
    const options: FormatPercentageOptions = { fallback: 'Invalid' };
    expect(formatPercentage('invalid', options)).toBe('Invalid');
  });

  it('should return default fallback for NaN values when no fallback provided', () => {
    expect(formatPercentage('invalid')).toBe('NaN');
  });

  it('should handle negative numbers', () => {
    expect(formatPercentage(-0.5)).toBe('-50%');
    expect(formatPercentage(-0.123)).toBe('-12.3%');
  });

  it('should handle large numbers', () => {
    expect(formatPercentage(2.5)).toBe('250%');
    expect(formatPercentage(10)).toBe('1,000%');
  });

  it('should handle very small numbers', () => {
    const options: FormatPercentageOptions = { maximumFractionDigits: 4 };
    expect(formatPercentage(0.01, options)).toBe('1%');
    expect(formatPercentage(0.001, options)).toBe('0.1%');
  });

  it('should use Korean locale by default', () => {
    expect(formatPercentage(0.5)).toBe('50%');
    expect(formatPercentage(1000)).toBe('100,000%');
  });

  it('should handle zero with different fraction digits', () => {
    expect(formatPercentage(0)).toBe('0%');
    expect(formatPercentage(0, { minimumFractionDigits: 2 })).toBe('0.00%');
    expect(formatPercentage(0, { maximumFractionDigits: 0 })).toBe('0%');
  });
});
