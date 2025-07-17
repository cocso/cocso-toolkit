type Target = '_blank' | '_self' | '_parent' | '_top' | string;

type Features = {
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

type Options = {
  target?: Target;
} & Features;

/**
 * @description
 * `buildFeatures` is a helper function that converts a Features object into a window.open features string.
 *
 * @param {Features} features - The features object containing window properties.
 *
 * @returns {string} A comma-separated string of window features for window.open.
 *
 * @example
 * const features = buildFeatures({
 *   width: 800,
 *   height: 600,
 *   resizable: true,
 *   scrollbars: false
 * });
 * // Returns: width=800,height=600,resizable=yes,scrollbars=no
 */
function buildFeatures(features: Features): string {
  const featurePairs: string[] = [];

  if (features.width !== undefined) featurePairs.push(`width=${features.width}`);
  if (features.height !== undefined) featurePairs.push(`height=${features.height}`);
  if (features.top !== undefined) featurePairs.push(`top=${features.top}`);
  if (features.left !== undefined) featurePairs.push(`left=${features.left}`);

  const booleanFeatures: (keyof Features)[] = [
    'resizable',
    'scrollbars',
    'menubar',
    'toolbar',
    'location',
    'status',
    'directories',
    'copyhistory',
  ];
  booleanFeatures.forEach((feature) => {
    if (features[feature] !== undefined) {
      featurePairs.push(`${feature}=${features[feature] ? 'yes' : 'no'}`);
    }
  });

  if (features.noopener) featurePairs.push('noopener');
  if (features.noreferrer) featurePairs.push('noreferrer');

  return featurePairs.join(',');
}

/**
 * @description
 * `openPopupWindow` is a utility function that opens a new browser window with configurable options.
 * It provides a type-safe wrapper around the native window.open API with automatic positioning
 * and size constraints for better user experience.
 *
 * @param {string} url - The URL to open in the new window.
 * @param {Options} [options={}] - Configuration options for the popup window.
 * @param {Target} [options.target='_blank'] - The target window name.
 * @param {number} options.width=800 - The width of the popup window (constrained between 200px and 90% of screen width).
 * @param {number} [options.height=680] - The height of the popup window (constrained between 200px and 90% of screen height).
 * @param {boolean} [options.resizable=true] - Whether the window can be resized.
 * @param {boolean} [options.scrollbars=true] - Whether to show scrollbars.
 * @param {boolean} [options.menubar=false] - Whether to show the menu bar.
 * @param {boolean} [options.toolbar=false] - Whether to show the toolbar.
 * @param {boolean} [options.location=false] - Whether to show the location bar.
 * @param {boolean} [options.status=false] - Whether to show the status bar.
 * @param {boolean} [options.directories=false] - Whether to show the directories bar.
 * @param {boolean} [options.copyhistory=false] - Whether to copy the browsing history.
 * @param {boolean} [options.noopener=false] - Whether to prevent the new window from accessing the opener.
 * @param {boolean} [options.noreferrer=false] - Whether to prevent sending the referrer header.
 *
 * @returns {Window | null} The opened window object or null if the window could not be opened.
 *
 * @example
 * // Basic usage with default options
 * const popup = openPopupWindow('https://example.com');
 *
 * @example
 * // Custom size and position
 * const popup = openPopupWindow('https://example.com', {
 *   width: 1000,
 *   height: 800,
 *   top: 100,
 *   left: 200
 * });
 *
 * @example
 * // Secure popup with minimal UI
 * const popup = openPopupWindow('https://example.com', {
 *   width: 600,
 *   height: 400,
 *   menubar: false,
 *   toolbar: false,
 *   location: false,
 *   status: false,
 *   noopener: true,
 *   noreferrer: true
 * });
 */
export function openPopupWindow(url: string, options: Options = {}): Window | null {
  if (
    typeof window === 'undefined' ||
    typeof window.screen === 'undefined' ||
    typeof window.open !== 'function'
  ) {
    return null;
  }

  const {
    target = '_blank',
    width = 800,
    height = 680,
    resizable = true,
    scrollbars = true,
    menubar = false,
    toolbar = false,
    location = false,
    status = false,
    directories = false,
    copyhistory = false,
    noopener = false,
    noreferrer = false,
  } = options;

  const minSize = 200;
  const maxWidth = Math.floor(window.screen.width * 0.9);
  const maxHeight = Math.floor(window.screen.height * 0.9);
  const constrainedWidth = Math.max(minSize, Math.min(width, maxWidth));
  const constrainedHeight = Math.max(minSize, Math.min(height, maxHeight));

  const left = Math.max(0, (window.screen.width - constrainedWidth) / 2);
  const top = Math.max(0, (window.screen.height - constrainedHeight) / 2);

  const features: Features = {
    width: constrainedWidth,
    height: constrainedHeight,
    top: Math.floor(top),
    left: Math.floor(left),
    resizable,
    scrollbars,
    menubar,
    toolbar,
    location,
    status,
    directories,
    copyhistory,
    noopener,
    noreferrer,
  };

  const featuresString = buildFeatures(features);

  return window.open(url, target, featuresString);
}
