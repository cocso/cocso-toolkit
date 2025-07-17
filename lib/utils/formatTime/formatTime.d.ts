export interface FormatTimeOptions {
    format?: string;
    locale?: string;
    fallback?: string;
}
export declare function formatTime(input: string | Date, options?: FormatTimeOptions): string;
