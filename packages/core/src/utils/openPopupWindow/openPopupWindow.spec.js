import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { openPopupWindow } from './openPopupWindow';
describe('openPopupWindow', () => {
    let originalWindow;
    beforeEach(() => {
        originalWindow = global.window;
        global.window = {
            screen: { width: 1920, height: 1080 },
            open: vi.fn(() => ({})),
        };
    });
    afterEach(() => {
        global.window = originalWindow;
        vi.restoreAllMocks();
    });
    it('should open a popup with default options', () => {
        openPopupWindow('https://example.com');
        expect(window.open).toHaveBeenCalled();
        const [url, target, features] = window.open.mock.calls[0];
        expect(url).toBe('https://example.com');
        expect(target).toBe('_blank');
        expect(features).toContain('width=800');
        expect(features).toContain('height=680');
        expect(features).toContain('resizable=yes');
        expect(features).toContain('scrollbars=yes');
    });
    it('should apply custom size and position', () => {
        openPopupWindow('https://example.com', { width: 400, height: 300, top: 100, left: 200 });
        const [, , features] = window.open.mock.calls[0];
        expect(features).toContain('width=400');
        expect(features).toContain('height=300');
        expect(features).toContain('top=100');
        expect(features).toContain('left=200');
    });
    it('should apply boolean features', () => {
        openPopupWindow('https://example.com', {
            menubar: true,
            toolbar: true,
            location: true,
            status: true,
            directories: true,
            copyhistory: true,
        });
        const [, , features] = window.open.mock.calls[0];
        expect(features).toContain('menubar=yes');
        expect(features).toContain('toolbar=yes');
        expect(features).toContain('location=yes');
        expect(features).toContain('status=yes');
        expect(features).toContain('directories=yes');
        expect(features).toContain('copyhistory=yes');
    });
    it('should apply noopener and noreferrer', () => {
        openPopupWindow('https://example.com', { noopener: true, noreferrer: true });
        const [, , features] = window.open.mock.calls[0];
        expect(features).toContain('noopener');
        expect(features).toContain('noreferrer');
    });
    it('should use custom target', () => {
        openPopupWindow('https://example.com', { target: '_self' });
        const [, target] = window.open.mock.calls[0];
        expect(target).toBe('_self');
    });
    it('should constrain width and height to min/max', () => {
        openPopupWindow('https://example.com', { width: 10, height: 10 });
        let [, , features] = window.open.mock.calls[0];
        expect(features).toContain('width=200');
        expect(features).toContain('height=200');
        openPopupWindow('https://example.com', { width: 10000, height: 10000 });
        [, , features] = window.open.mock.calls[1];
        expect(features).toContain('width=1728'); // 1920 * 0.9
        expect(features).toContain('height=972'); // 1080 * 0.9
    });
    it('should return null if window is undefined', () => {
        global.window = undefined;
        expect(openPopupWindow('https://example.com')).toBeNull();
    });
    it('should return null if window.open is not a function', () => {
        global.window.open = undefined;
        expect(openPopupWindow('https://example.com')).toBeNull();
    });
    it('should return null if window.screen is undefined', () => {
        global.window.screen = undefined;
        expect(openPopupWindow('https://example.com')).toBeNull();
    });
});
//# sourceMappingURL=openPopupWindow.spec.js.map