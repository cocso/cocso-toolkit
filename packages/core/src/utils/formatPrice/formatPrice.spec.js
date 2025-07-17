import { describe, expect, it } from 'vitest';
import { formatPrice } from './formatPrice';
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
        const options = { locale: 'en-US' };
        expect(formatPrice(1234.56, options)).toBe('1,234.6원');
        expect(formatPrice(1000, options)).toBe('1,000원');
    });
    it('should use custom currency', () => {
        const options = { currency: 'USD' };
        expect(formatPrice(1000, options)).toBe('US$1,000');
        expect(formatPrice(1234.56, options)).toBe('US$1,234.56');
    });
    it('should respect maximumFractionDigits', () => {
        const options = { maximumFractionDigits: 2 };
        expect(formatPrice(1234.567, options)).toBe('1,234.57원');
        expect(formatPrice(1000, options)).toBe('1,000원');
    });
    it('should respect minimumFractionDigits', () => {
        const options = { minimumFractionDigits: 2, maximumFractionDigits: 2 };
        expect(formatPrice(1000, options)).toBe('1,000.00원');
        expect(formatPrice(1234.5, options)).toBe('1,234.50원');
    });
    it('should combine maximumFractionDigits and minimumFractionDigits', () => {
        const options = {
            maximumFractionDigits: 3,
            minimumFractionDigits: 2,
        };
        expect(formatPrice(1234.5, options)).toBe('1,234.50원');
        expect(formatPrice(1234.5678, options)).toBe('1,234.568원');
    });
    it('should return fallback for null values', () => {
        const options = { fallback: 'N/A' };
        expect(formatPrice(null, options)).toBe('N/A');
    });
    it('should return fallback for undefined values', () => {
        const options = { fallback: 'N/A' };
        expect(formatPrice(undefined, options)).toBe('N/A');
    });
    it('should return fallback for empty string', () => {
        const options = { fallback: 'N/A' };
        expect(formatPrice('', options)).toBe('N/A');
    });
    it('should return default fallback for null/undefined/empty when no fallback provided', () => {
        expect(formatPrice(null)).toBe('-');
        expect(formatPrice(undefined)).toBe('-');
        expect(formatPrice('')).toBe('-');
    });
    it('should return fallback for NaN values', () => {
        const options = { fallback: 'Invalid' };
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
        const options = { maximumFractionDigits: 4 };
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
});
//# sourceMappingURL=formatPrice.spec.js.map