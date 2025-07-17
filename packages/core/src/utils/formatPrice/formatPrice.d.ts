export type FormatPriceOptions = {
    locale?: string;
    currency?: string;
    maximumFractionDigits?: number;
    minimumFractionDigits?: number;
    fallback?: string;
};
/**
 * @description
 * `formatPrice` is a utility function that formats a number or string as a price with currency.
 * It uses the Intl.NumberFormat API to format the value with proper locale support and
 * customizable fraction digits. For KRW currency, it appends '원' suffix, while other
 * currencies use the standard currency formatting.
 *
 * @param {number | string} amount - The value to format as a price. Can be a number or string.
 * @param {FormatPriceOptions} options - Configuration options for formatting.
 * @returns {string} The formatted price string with currency.
 *
 * @example
 * formatPrice(1234.56); // "1,234.6원"
 * formatPrice('1234.56', { maximumFractionDigits: 2 }); // "1,234.56원"
 * formatPrice(100, { currency: 'USD' }); // "$100.00"
 * formatPrice(null, { fallback: 'N/A' }); // "N/A"
 */
export declare function formatPrice(amount: number | string, options?: FormatPriceOptions): string;
//# sourceMappingURL=formatPrice.d.ts.map