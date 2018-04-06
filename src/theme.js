import { css } from 'styled-components';

// NOTE: this is a slightly convoluted setup that is necessary, because our choice of tools does not align well here
// * we want to use `styled-systems`-way of having responsive sizes by passing an array for props, @see https://github.com/jxnblk/styled-system#responsive-styles
// * at the same time we want an expressive way to write our own media-queries within styled components
// * styled-system does not accept an object for this config it has to be an array
// * so we keep the information in an object with expressive, keys while passing the same values to the breakpoints
//    setting of styled-system
const screens = {
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
};

const breakpoints = Object.values(screens);

const colors = {
  black: 'rgba(0, 0, 0, 0.85)',
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
  red: {
    base: '#E3342F',
    dark: '#CC1F1A',
    darker: '#621B18',
  },
};

const fonts = {
  logo:
    '"Patua One", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  headline:
    '"Patua One", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  body:
    '"Lora", "Constantia", "Lucida Bright", "Lucidabright", "Lucida Serif", "Lucida", "DejaVu Serif", "Bitstream Vera Serif", "Liberation Serif", "Georgia", "serif"',
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
const space = {
  containerBorder: '6px',
  px: '1px',
  '0': '0',
  '1': '0.25rem',
  '2': '0.5rem',
  '3': '1rem',
  '4': '1.5rem',
  '5': '2rem',
  '6': '4rem',
  '7': '8rem',
  '8': '16rem',
  '9': '32rem',
};

const zIndex = {
  low: 10,
  middle: 50,
  high: 100,
};

const theme = {
  breakpoints,
  colors,
  fonts,
  fontSizes,
  fontWeights,
  letterSpacings,
  lineHeights,
  space,
  zIndex,
};

export const createMaxWidthMediaQueryCondition = label =>
  `(max-width: ${parseInt(screens[label], 10) / 16}rem)`;

export const media = Object.keys(screens).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media ${createMaxWidthMediaQueryCondition(label)} {
      ${css(...args)};
    }
  `;

  return acc;
}, {});
