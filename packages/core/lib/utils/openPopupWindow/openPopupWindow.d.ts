export type OpenPopupWindowTarget = '_blank' | '_self' | '_parent' | '_top' | string;
export type OpenPopupWindowFeatures = {
    width?: number;
    height?: number;
    top?: number;
    left?: number;
    resizable?: boolean;
    scrollbars?: boolean;
    menubar?: boolean;
    toolbar?: boolean;
    location?: boolean;
    status?: boolean;
    directories?: boolean;
    copyhistory?: boolean;
    noopener?: boolean;
    noreferrer?: boolean;
};
export type OpenPopupWindowOptions = {
    target?: OpenPopupWindowTarget;
} & OpenPopupWindowFeatures;
/**
 * @description
 * `openPopupWindow` is a utility function that opens a new browser window (popup) with configurable features and positioning.
 * It handles default sizing, centering, and feature string construction for window.open.
 *
 * @param {string} url - The URL to open in the popup window.
 * @param {OpenPopupWindowOptions} options - Configuration options for the popup window (size, position, features, etc.).
 * @returns {Window | null} The window object of the opened popup, or null if not available (e.g., server-side).
 *
 * @example
 * openPopupWindow('https://example.com');
 * openPopupWindow('https://example.com', { width: 400, height: 300, resizable: false });
 * openPopupWindow('https://example.com', { target: '_self', noopener: true });
 */
export declare function openPopupWindow(url: string, options?: OpenPopupWindowOptions): Window | null;
