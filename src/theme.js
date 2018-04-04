const colors = {
  black: '#22292f',
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
};

const fonts = {
  logo: '"Fjalla One", sans-serif',
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

// Spacing Scale (used for margin and padding)
const space = [0, 4, 8, 16, 32, 64, 128, 256, 512];

const zIndex = {
  low: 10,
  middle: 50,
  high: 100,
};

const theme = {
  colors,
  fonts,
  fontSizes,
  space,
  zIndex,
};

export default theme;
