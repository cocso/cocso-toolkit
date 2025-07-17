export type FormatPercentageOptions = {
    locale?: string;
    maximumFractionDigits?: number;
    minimumFractionDigits?: number;
    fallback?: string;
};
export declare function formatPercentage(rate: number | string, options?: FormatPercentageOptions): string;
