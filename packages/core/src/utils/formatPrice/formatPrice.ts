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
export function formatPrice(amount: number | string, options: FormatPriceOptions = {}): string {
  const {
    locale = 'ko-KR',
    currency = 'KRW',
    maximumFractionDigits,
    minimumFractionDigits = 0,
    fallback,
    currencyDisplay = 'symbol',
  } = options;

  if (amount === undefined || amount === null || amount === '') {
    return fallback ?? '-';
  }

  const parsedAmount = typeof amount === 'number' ? amount : Number(amount.replace(/,/g, ''));

  if (isNaN(parsedAmount)) {
    return fallback ?? 'NaN';
  }

  if (currency === 'KRW') {
    const maxDigits = maximumFractionDigits ?? 1;
    const minDigits = minimumFractionDigits ?? 0;

    const formattedNumber = new Intl.NumberFormat(locale, {
      maximumFractionDigits: maxDigits,
      minimumFractionDigits: Math.min(minDigits, maxDigits),
    }).format(parsedAmount);

    if (currencyDisplay === 'none') {
      return formattedNumber;
    }

    if (currencyDisplay === 'symbol') {
      return `${formattedNumber}원`;
    }

    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      currencyDisplay,
      maximumFractionDigits: maxDigits,
      minimumFractionDigits: Math.min(minDigits, maxDigits),
    }).format(parsedAmount);
  }

  const maxDigits = maximumFractionDigits ?? 3;
  const minDigits = minimumFractionDigits ?? 0;

  if (currencyDisplay === 'none') {
    return new Intl.NumberFormat(locale, {
      maximumFractionDigits: maxDigits,
      minimumFractionDigits: Math.min(minDigits, maxDigits),
    }).format(parsedAmount);
  }

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    currencyDisplay,
    maximumFractionDigits: maxDigits,
    minimumFractionDigits: Math.min(minDigits, maxDigits),
  }).format(parsedAmount);
}
