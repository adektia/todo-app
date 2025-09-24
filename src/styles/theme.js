import { PALETTE, STATUS, FONT_SIZES, SPACING, RADIUS, FONTS } from './tokens';

export const lightTheme = {
  mode: 'light',
  colors: { ...PALETTE.light },
  status: STATUS.light,
  radii: RADIUS,
  fonts: FONTS,
  fontSizes: FONT_SIZES,
  spacing: SPACING,
  z: {
    toolbar: 10,
    stickyUnderToolbar: 9,
    modal: 1000,
  },
};

export const darkTheme = {
  mode: 'dark',
  colors: { ...PALETTE.dark },
  status: STATUS.dark,
  radii: RADIUS,
  fonts: FONTS,
  fontSizes: FONT_SIZES,
  spacing: SPACING,
  z: {
    toolbar: 10,
    stickyUnderToolbar: 9,
    modal: 1000,
  },
};
