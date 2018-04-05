const colors = {
  black: 'rgba(0, 0, 0, 0.8)',
  grey: {
    darkest: '#3d4852',
    darker: '#606f7b',
    dark: '#8795a1',
    base: '#b8c2cc',
    light: '#dae1e7',
    lighter: '#f1f5f8',
    lightest: '#f8fafc',
  },
  white: '#fff',
  transparentWhite: 'rgba(255, 255, 255, 0.8)',
};

const fonts = {
  logo:
    '"Patua One", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  body:
    '"Patua One", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
};

const fontSizes = {
  xs: '.75rem', // 12px
  sm: '.875rem', // 14px
  base: '1rem', // 16px
  lg: '1.125rem', // 18px
  xl: '1.25rem', // 20px
  '2xl': '1.5rem', // 24px
  '3xl': '1.875rem', // 30px
  '4xl': '2.25rem', // 36px
  '5xl': '3rem', // 48px
};

const fontWeights = {
  hairline: 100,
  thin: 200,
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
};

const letterSpacings = {
  tight: '-0.05em',
  normal: '0',
  wide: '0.05em',
};

const lineHeights = {
  none: 1,
  tight: 1.25,
  normal: 1.5,
  loose: 2,
};

// Spacing Scale (used for margin and padding)
const space = [0, 4, 8, 16, 24, 32, 64, 128, 256, 512];

const zIndex = {
  low: 10,
  middle: 50,
  high: 100,
};

const theme = {
  colors,
  fonts,
  fontSizes,
  fontWeights,
  letterSpacings,
  lineHeights,
  space,
  zIndex,
};

export default theme;
