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

function buildFeatures(features: OpenPopupWindowFeatures): string {
  const featurePairs: string[] = [];

  if (features.width !== undefined) featurePairs.push(`width=${features.width}`);
  if (features.height !== undefined) featurePairs.push(`height=${features.height}`);
  if (features.top !== undefined) featurePairs.push(`top=${features.top}`);
  if (features.left !== undefined) featurePairs.push(`left=${features.left}`);

  const booleanFeatures: (keyof OpenPopupWindowFeatures)[] = [
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

export function openPopupWindow(url: string, options: OpenPopupWindowOptions = {}): Window | null {
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
    top,
    left,
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

  const defaultLeft = Math.max(0, (window.screen.width - constrainedWidth) / 2);
  const defaultTop = Math.max(0, (window.screen.height - constrainedHeight) / 2);

  const features: OpenPopupWindowFeatures = {
    width: constrainedWidth,
    height: constrainedHeight,
    top: typeof top === 'number' ? Math.floor(top) : Math.floor(defaultTop),
    left: typeof left === 'number' ? Math.floor(left) : Math.floor(defaultLeft),
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
