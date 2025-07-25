export type FormatPriceOptions = {
    locale?: string;
    currency?: string;
    maximumFractionDigits?: number;
    minimumFractionDigits?: number;
    currencyDisplay?: 'symbol' | 'narrowSymbol' | 'code' | 'name' | 'none';
    fallback?: string;
};
/**
 * @description
 * `formatPrice` is a utility function that formats a number or string as a price with currency.
 * It uses the Intl.NumberFormat API to format the value with proper locale support and
 * customizable fraction digits. For KRW currency, it appends '원' suffix, while other
 * currencies use the standard currency formatting. For KRW currency, when currencyDisplay
 * is 'symbol' (default), it appends '원' suffix for Korean users' familiarity. Other
 * currencyDisplay options follow the web standard.
 *
 * @param {number | string} amount - The value to format as a price. Can be a number or string.
 * @param {FormatPriceOptions} options - Configuration options for formatting.
 * @returns {string} The formatted price string with currency.
 *
 * @example
 * formatPrice(1234.56); // "1,234.6원"
 * formatPrice(1234.56, { currencyDisplay: 'code' }); // "KRW 1,234.6"
 * formatPrice('1234.56', { maximumFractionDigits: 2 }); // "1,234.56원"
 * formatPrice(100, { currency: 'USD' }); // "$100.00"
 * formatPrice(100, { currency: 'USD', currencyDisplay: 'name' }); // "100.00 US dollars"
 * formatPrice(1234.56, { currencyDisplay: 'name' }); // "1,234.6 대한민국 원"
 * formatPrice(1234.56, { currencyDisplay: 'none' }); // "1,234.6"
 * formatPrice(null, { fallback: 'N/A' }); // "N/A"
 */
export declare function formatPrice(amount: number | string, options?: FormatPriceOptions): string;
