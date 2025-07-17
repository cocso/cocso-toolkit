export type FormatPercentageOptions = {
    locale?: string;
    maximumFractionDigits?: number;
    minimumFractionDigits?: number;
    fallback?: string;
};
/**
 * @description
 * `formatPercentage` is a utility function that formats a number or string as a percentage.
 * It uses the Intl.NumberFormat API to format the value with proper locale support and
 * customizable fraction digits.
 *
 * @param {number | string} rate - The value to format as a percentage. Can be a number or string.
 * @param {FormatPercentageOptions} options - Configuration options for formatting.
 * @returns {string} The formatted percentage string.
 *
 * @example
 * formatPercentage(0.5); // "50%"
 * formatPercentage('0.1234', { maximumFractionDigits: 2 }); // "12.34%"
 * formatPercentage(null, { fallback: 'N/A' }); // "N/A"
 */
export declare function formatPercentage(rate: number | string, options?: FormatPercentageOptions): string;
//# sourceMappingURL=formatPercentage.d.ts.map