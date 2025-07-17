export type FormatPriceOptions = {
  locale?: string;
  currency?: string;
  maximumFractionDigits?: number;
  minimumFractionDigits?: number;
  fallback?: string;
};

export function formatPrice(amount: number | string, options: FormatPriceOptions = {}): string {
  const {
    locale = 'ko-KR',
    currency = 'KRW',
    maximumFractionDigits,
    minimumFractionDigits = 0,
    fallback,
  } = options;

  if (amount === undefined || amount === null || amount === '') {
    return fallback ?? '-';
  }

  const parsedAmount = typeof amount === 'number' ? amount : Number(amount.replace(/,/g, ''));

  if (isNaN(parsedAmount)) {
    return fallback ?? 'NaN';
  }

  if (currency === 'KRW') {
    return `${new Intl.NumberFormat(locale, {
      maximumFractionDigits: maximumFractionDigits ?? 1,
      minimumFractionDigits,
    }).format(parsedAmount)}원`;
  }

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: maximumFractionDigits ?? 3,
    minimumFractionDigits,
  }).format(parsedAmount);
}
