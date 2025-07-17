export type FormatPercentageOptions = {
  locale?: string;
  maximumFractionDigits?: number;
  minimumFractionDigits?: number;
  fallback?: string;
};

export function formatPercentage(
  rate: number | string,
  options: FormatPercentageOptions = {},
): string {
  const {
    locale = 'ko-KR',
    maximumFractionDigits = 3,
    minimumFractionDigits = 0,
    fallback,
  } = options;

  if (rate === undefined || rate === null || rate === '') {
    return fallback ?? '-';
  }

  const numericRate = typeof rate === 'string' ? Number(rate) : rate;

  if (isNaN(numericRate)) {
    return fallback ?? 'NaN';
  }

  return new Intl.NumberFormat(locale, {
    style: 'percent',
    maximumFractionDigits,
    minimumFractionDigits,
  }).format(numericRate);
}
