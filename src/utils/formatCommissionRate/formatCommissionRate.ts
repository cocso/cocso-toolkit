export type FormatCommissionRateOptions = {
  locale?: string;
  maximumFractionDigits?: number;
  minimumFractionDigits?: number;
  fallbackValue?: string;
};

/**
 * @description
 * `formatCommissionRate` is a utility function that formats a commission rate as a percentage string
 * using the Intl.NumberFormat API. It provides locale-aware formatting with configurable decimal precision
 * and fallback handling for invalid or empty values.
 *
 * @param {number | string} rate - The commission rate to format. Undefined or null is not allowed by type, but will be checked internally for safety.
 * @param {FormatCommissionRateOptions} [options={}] - Formatting options.
 * @param {string} [options.locale='ko-KR'] - The locale to use for formatting (e.g., 'ko-KR', 'en-US').
 * @param {number} [options.maximumFractionDigits=3] - Maximum number of fraction digits.
 * @param {number} [options.minimumFractionDigits=0] - Minimum number of fraction digits.
 * @param {string} [options.fallbackValue] - Value to return for invalid/null/empty input. If not set, returns 'NaN' for invalid numbers or '' for null/empty.
 *
 * @returns {string} The formatted commission rate as a percentage string.
 *
 * @example
 * // Basic usage with default options
 * formatCommissionRate(0.1234); // "12.34%"
 *
 * @example
 * // String input
 * formatCommissionRate('0.5'); // "50%"
 *
 * @example
 * // Handling invalid values
 * formatCommissionRate(NaN); // "NaN"
 * formatCommissionRate(undefined as any, { fallbackValue: 'N/A' }); // "N/A"
 * formatCommissionRate('invalid', { fallbackValue: 'N/A' }); // "N/A"
 *
 * @example
 * // Custom locale and precision
 * formatCommissionRate(0.1234, { locale: 'en-US', maximumFractionDigits: 1 }); // "12.3%"
 */
export function formatCommissionRate(
  rate: number | string,
  options: FormatCommissionRateOptions = {},
): string {
  const {
    locale = 'ko-KR',
    maximumFractionDigits = 3,
    minimumFractionDigits = 0,
    fallbackValue,
  } = options;

  if (rate === undefined || rate === null || rate === '') {
    return fallbackValue ?? '';
  }

  const numericRate = typeof rate === 'string' ? Number(rate) : rate;

  if (isNaN(numericRate)) {
    return fallbackValue ?? 'NaN';
  }

  return new Intl.NumberFormat(locale, {
    style: 'percent',
    maximumFractionDigits,
    minimumFractionDigits,
  }).format(numericRate);
}
