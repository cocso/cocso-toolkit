import { describe, expect, it } from 'vitest';
import { formatTime } from './formatTime';
describe('formatTime', () => {
    it('should format a date string with default options', () => {
        expect(formatTime('2024-06-01')).toBe('2024.06.01');
    });
    it('should format a Date object with default options', () => {
        const date = new Date('2024-06-01T00:00:00Z');
        expect(formatTime(date)).toBe('2024.06.01');
    });
    it('should use custom format', () => {
        const options = { format: 'YYYY/MM/DD' };
        expect(formatTime('2024-06-01', options)).toBe('2024/06/01');
    });
    it('should use custom locale', () => {
        const options = { locale: 'en' };
        expect(formatTime('2024-06-01', options)).toBe('2024.06.01'); // Format remains, but locale is set
    });
    it('should return fallback for empty string', () => {
        const options = { fallback: 'N/A' };
        expect(formatTime('', options)).toBe('N/A');
    });
    it('should return fallback for null input', () => {
        const options = { fallback: 'N/A' };
        expect(formatTime(null, options)).toBe('N/A');
    });
    it('should return fallback for undefined input', () => {
        const options = { fallback: 'N/A' };
        expect(formatTime(undefined, options)).toBe('N/A');
    });
    it('should return default fallback for empty string when no fallback provided', () => {
        expect(formatTime('')).toBe('-');
    });
    it('should return default fallback for null input when no fallback provided', () => {
        expect(formatTime(null)).toBe('-');
    });
    it('should return default fallback for undefined input when no fallback provided', () => {
        expect(formatTime(undefined)).toBe('-');
    });
    it('should return fallback for invalid date', () => {
        const options = { fallback: 'Invalid' };
        expect(formatTime('not-a-date', options)).toBe('Invalid');
    });
    it('should return default fallback for invalid date when no fallback provided', () => {
        expect(formatTime('not-a-date')).toBe('Invalid Date');
    });
    it('should handle various date formats', () => {
        expect(formatTime('2024/06/01')).toBe('2024.06.01');
        expect(formatTime('June 1, 2024')).toBe('2024.06.01');
        expect(formatTime('2024-06-01T12:34:56Z')).toBe('2024.06.01');
    });
});
//# sourceMappingURL=formatTime.spec.js.map