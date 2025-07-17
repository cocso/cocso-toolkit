import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export interface FormatTimeOptions {
  format?: string;
  locale?: string;
  fallback?: string;
}

export function formatTime(input: string | Date, options: FormatTimeOptions = {}): string {
  const { format = 'YYYY.MM.DD', locale = 'ko', fallback } = options;

  if (!input) {
    return fallback ?? '-';
  }

  const date = dayjs(input);

  if (!date.isValid()) {
    return fallback ?? 'Invalid Date';
  }

  return date.locale(locale).format(format);
}
