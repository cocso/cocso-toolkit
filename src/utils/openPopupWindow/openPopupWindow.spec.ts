import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { openPopupWindow } from './openPopupWindow';

describe('openPopupWindow', () => {
  let mockWindow: any;
  let mockOpen: any;

  beforeEach(() => {
    mockOpen = vi.fn();
    mockWindow = {
      open: mockOpen,
      screen: { width: 1920, height: 1080 },
    };
    try {
      delete (globalThis as any).window;
    } catch {}
    (globalThis as any).window = mockWindow;
  });

  afterEach(() => {
    vi.clearAllMocks();
    try {
      delete (globalThis as any).window;
    } catch {}
  });

  it('should open a popup window with default options', () => {
    const url = 'https://example.com';
    const result = openPopupWindow(url);
    expect(mockOpen).toHaveBeenCalledWith(
      url,
      '_blank',
      'width=800,height=680,top=200,left=560,resizable=yes,scrollbars=yes,menubar=no,toolbar=no,location=no,status=no,directories=no,copyhistory=no',
    );
    expect(result).toBe(mockOpen());
  });

  it('should apply custom width and height', () => {
    const url = 'https://example.com';
    const result = openPopupWindow(url, { width: 100, height: 800 });
    expect(mockOpen).toHaveBeenCalledWith(
      url,
      '_blank',
      'width=200,height=800,top=140,left=860,resizable=yes,scrollbars=yes,menubar=no,toolbar=no,location=no,status=no,directories=no,copyhistory=no',
    );
  });

  it('should constrain the window size to screen limits', () => {
    const url = 'https://example.com';
    const result = openPopupWindow(url, { width: 3000, height: 2000 });
    expect(mockOpen).toHaveBeenCalledWith(
      url,
      '_blank',
      'width=1728,height=972,top=54,left=96,resizable=yes,scrollbars=yes,menubar=no,toolbar=no,location=no,status=no,directories=no,copyhistory=no',
    );
  });

  it('should enforce the minimum window size', () => {
    const url = 'https://example.com';
    const result = openPopupWindow(url, { width: 100, height: 150 });
    expect(mockOpen).toHaveBeenCalledWith(
      url,
      '_blank',
      'width=200,height=200,top=440,left=860,resizable=yes,scrollbars=yes,menubar=no,toolbar=no,location=no,status=no,directories=no,copyhistory=no',
    );
  });

  it('should use the provided target option', () => {
    const url = 'https://example.com';
    const result = openPopupWindow(url, { target: '_self' });
    expect(mockOpen).toHaveBeenCalledWith(
      url,
      '_self',
      'width=800,height=680,top=200,left=560,resizable=yes,scrollbars=yes,menubar=no,toolbar=no,location=no,status=no,directories=no,copyhistory=no',
    );
  });

  it('should apply all feature options', () => {
    const url = 'https://example.com';
    const opts = {
      resizable: false,
      scrollbars: false,
      menubar: true,
      toolbar: true,
      location: true,
      status: true,
      directories: true,
      copyhistory: true,
      noopener: true,
      noreferrer: true,
    };
    openPopupWindow(url, opts);
    expect(mockOpen).toHaveBeenCalledWith(
      url,
      '_blank',
      'width=800,height=680,top=200,left=560,resizable=no,scrollbars=no,menubar=yes,toolbar=yes,location=yes,status=yes,directories=yes,copyhistory=yes,noopener,noreferrer',
    );
  });

  it('should return null if window is missing', () => {
    try {
      delete (globalThis as any).window;
    } catch {}
    const url = 'https://example.com';
    const result = openPopupWindow(url);
    expect(result).toBeNull();
  });

  it('should return null if window.open is missing', () => {
    (globalThis as any).window.open = undefined;
    const url = 'https://example.com';
    const result = openPopupWindow(url);
    expect(result).toBeNull();
  });

  it('should return null if window.screen is missing', () => {
    (globalThis as any).window.screen = undefined;
    const url = 'https://example.com';
    const result = openPopupWindow(url);
    expect(result).toBeNull();
  });

  it('should use the provided top and left for positioning', () => {
    const url = 'https://example.com';
    const result = openPopupWindow(url, { top: 100, left: 200 });
    expect(mockOpen).toHaveBeenCalledWith(
      url,
      '_blank',
      'width=800,height=680,top=100,left=200,resizable=yes,scrollbars=yes,menubar=no,toolbar=no,location=no,status=no,directories=no,copyhistory=no',
    );
  });

  it('should center the window if no position is provided', () => {
    const url = 'https://example.com';
    openPopupWindow(url);
    expect(mockOpen).toHaveBeenCalledWith(
      url,
      '_blank',
      'width=800,height=680,top=200,left=560,resizable=yes,scrollbars=yes,menubar=no,toolbar=no,location=no,status=no,directories=no,copyhistory=no',
    );
  });
});
