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
export declare function openPopupWindow(url: string, options?: OpenPopupWindowOptions): Window | null;
