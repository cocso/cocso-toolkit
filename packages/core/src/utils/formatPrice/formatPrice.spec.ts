import { describe, expect, it } from 'vitest';

import { formatPrice, type FormatPriceOptions } from './formatPrice';

describe('formatPrice', () => {
  it('should format a number as price with default options (KRW)', () => {
    expect(formatPrice(1234.56)).toBe('1,234.6원');
    expect(formatPrice(1000)).toBe('1,000원');
    expect(formatPrice(0)).toBe('0원');
  });

  it('should format a string number as price', () => {
    expect(formatPrice('1234.56')).toBe('1,234.6원');
    expect(formatPrice('1000')).toBe('1,000원');
    expect(formatPrice('0')).toBe('0원');
  });

  it('should use custom locale', () => {
    const options: FormatPriceOptions = { locale: 'en-US' };
    expect(formatPrice(1234.56, options)).toBe('1,234.6원');
    expect(formatPrice(1000, options)).toBe('1,000원');
  });

  it('should use custom currency', () => {
    const options: FormatPriceOptions = { currency: 'USD' };
    expect(formatPrice(1000, options)).toBe('US$1,000');
    expect(formatPrice(1234.56, options)).toBe('US$1,234.56');
  });

  it('should respect maximumFractionDigits', () => {
    const options: FormatPriceOptions = { maximumFractionDigits: 2 };
    expect(formatPrice(1234.567, options)).toBe('1,234.57원');
    expect(formatPrice(1000, options)).toBe('1,000원');
  });

  it('should respect minimumFractionDigits', () => {
    const options: FormatPriceOptions = { minimumFractionDigits: 2, maximumFractionDigits: 2 };
    expect(formatPrice(1000, options)).toBe('1,000.00원');
    expect(formatPrice(1234.5, options)).toBe('1,234.50원');
  });

  it('should combine maximumFractionDigits and minimumFractionDigits', () => {
    const options: FormatPriceOptions = {
      maximumFractionDigits: 3,
      minimumFractionDigits: 2,
    };
    expect(formatPrice(1234.5, options)).toBe('1,234.50원');
    expect(formatPrice(1234.5678, options)).toBe('1,234.568원');
  });

  it('should return fallback for null values', () => {
    const options: FormatPriceOptions = { fallback: 'N/A' };
    expect(formatPrice(null as any, options)).toBe('N/A');
  });

  it('should return fallback for undefined values', () => {
    const options: FormatPriceOptions = { fallback: 'N/A' };
    expect(formatPrice(undefined as any, options)).toBe('N/A');
  });

  it('should return fallback for empty string', () => {
    const options: FormatPriceOptions = { fallback: 'N/A' };
    expect(formatPrice('', options)).toBe('N/A');
  });

  it('should return default fallback for null/undefined/empty when no fallback provided', () => {
    expect(formatPrice(null as any)).toBe('-');
    expect(formatPrice(undefined as any)).toBe('-');
    expect(formatPrice('')).toBe('-');
  });

  it('should return fallback for NaN values', () => {
    const options: FormatPriceOptions = { fallback: 'Invalid' };
    expect(formatPrice('invalid', options)).toBe('Invalid');
  });

  it('should return default fallback for NaN values when no fallback provided', () => {
    expect(formatPrice('invalid')).toBe('NaN');
  });

  it('should handle negative numbers', () => {
    expect(formatPrice(-1234.56)).toBe('-1,234.6원');
    expect(formatPrice('-1000')).toBe('-1,000원');
  });

  it('should handle large numbers', () => {
    expect(formatPrice(1000000)).toBe('1,000,000원');
    expect(formatPrice(123456789.12)).toBe('123,456,789.1원');
  });

  it('should handle very small numbers', () => {
    const options: FormatPriceOptions = { maximumFractionDigits: 4 };
    expect(formatPrice(0.01, options)).toBe('0.01원');
    expect(formatPrice(0.001, options)).toBe('0.001원');
  });

  it('should use Korean locale by default', () => {
    expect(formatPrice(1000)).toBe('1,000원');
    expect(formatPrice(1234567.89)).toBe('1,234,567.9원');
  });

  it('should handle zero with different fraction digits', () => {
    expect(formatPrice(0)).toBe('0원');
    expect(formatPrice(0, { minimumFractionDigits: 2, maximumFractionDigits: 2 })).toBe('0.00원');
    expect(formatPrice(0, { maximumFractionDigits: 0, minimumFractionDigits: 0 })).toBe('0원');
  });

  describe('currencyDisplay options for KRW', () => {
    it('should use symbol (default) with Korean style', () => {
      expect(formatPrice(1234.56, { currencyDisplay: 'symbol' })).toBe('1,234.6원');
      expect(formatPrice(1000, { currencyDisplay: 'symbol' })).toBe('1,000원');
    });

    it('should use narrowSymbol with web standard', () => {
      expect(formatPrice(1234.56, { currencyDisplay: 'narrowSymbol' })).toBe('₩1,234.6');
      expect(formatPrice(1000, { currencyDisplay: 'narrowSymbol' })).toBe('₩1,000');
    });

    it('should use code with web standard', () => {
      expect(formatPrice(1234.56, { currencyDisplay: 'code' })).toBe('KRW\u00A01,234.6');
      expect(formatPrice(1000, { currencyDisplay: 'code' })).toBe('KRW\u00A01,000');
    });

    it('should use name with web standard', () => {
      expect(formatPrice(1234.56, { currencyDisplay: 'name' })).toBe('1,234.6 대한민국 원');
      expect(formatPrice(1000, { currencyDisplay: 'name' })).toBe('1,000 대한민국 원');
    });

    it('should use none to show only the value', () => {
      expect(formatPrice(1234.56, { currencyDisplay: 'none' })).toBe('1,234.6');
      expect(formatPrice(1000, { currencyDisplay: 'none' })).toBe('1,000');
    });
  });

  describe('currencyDisplay options for other currencies', () => {
    it('should use symbol for USD', () => {
      expect(formatPrice(1000, { currency: 'USD', currencyDisplay: 'symbol' })).toBe('US$1,000');
      expect(formatPrice(1234.56, { currency: 'USD', currencyDisplay: 'symbol' })).toBe('US$1,234.56');
    });

    it('should use narrowSymbol for USD', () => {
      expect(formatPrice(1000, { currency: 'USD', currencyDisplay: 'narrowSymbol' })).toBe('$1,000');
      expect(formatPrice(1234.56, { currency: 'USD', currencyDisplay: 'narrowSymbol' })).toBe('$1,234.56');
    });

    it('should use code for USD', () => {
      expect(formatPrice(1000, { currency: 'USD', currencyDisplay: 'code' })).toBe('USD\u00A01,000');
      expect(formatPrice(1234.56, { currency: 'USD', currencyDisplay: 'code' })).toBe('USD\u00A01,234.56');
    });

    it('should use name for USD', () => {
      expect(formatPrice(1000, { currency: 'USD', currencyDisplay: 'name' })).toBe('1,000 미국 달러');
      expect(formatPrice(1234.56, { currency: 'USD', currencyDisplay: 'name' })).toBe('1,234.56 미국 달러');
    });

    it('should use symbol for EUR', () => {
      expect(formatPrice(1000, { currency: 'EUR', currencyDisplay: 'symbol' })).toBe('€1,000');
      expect(formatPrice(1234.56, { currency: 'EUR', currencyDisplay: 'symbol' })).toBe('€1,234.56');
    });

    it('should use code for EUR', () => {
      expect(formatPrice(1000, { currency: 'EUR', currencyDisplay: 'code' })).toBe('EUR\u00A01,000');
      expect(formatPrice(1234.56, { currency: 'EUR', currencyDisplay: 'code' })).toBe('EUR\u00A01,234.56');
    });

    it('should use none for USD to show only the value', () => {
      expect(formatPrice(1000, { currency: 'USD', currencyDisplay: 'none' })).toBe('1,000');
      expect(formatPrice(1234.56, { currency: 'USD', currencyDisplay: 'none' })).toBe('1,234.56');
    });
  });
}); 