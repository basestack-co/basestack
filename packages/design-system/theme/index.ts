import { rem } from "polished";

const typography = {
  fontFamily: "'Roboto', sans-serif",
};

const colors = {
  primary: "#276EF1",
  white: "#FFFFFF",
  black: "#000000",

  gray900: "#141414",
  gray800: "#1F1F1F",
  gray700: "#333333",
  gray600: "#545454",
  gray500: "#757575",
  gray400: "#AFAFAF",
  gray300: "#CBCBCB",
  gray200: "#E2E2E2",
  gray100: "#EEEEEE",
  gray50: "#F6F6F6",
  gray10: "#FAFAFA",

  blue400: "#276EF1",
  blue300: "#5B91F5",
  blue200: "#A0BFF8",
  blue100: "#D4E2FC",

  green400: "#05944F",
  green300: "#06C167",
  green200: "#66D19E",
  green100: "#ADDEC9",

  red400: "#E11900",
  red300: "#E85C4A",
  red200: "#F1998E",
  red100: "#FED7D2",
};

const zIndex = {
  navigation: 100,
};

const spacing = {
  s1: rem("5px"),
  s2: rem("10px"),
  s3: rem("15px"),
  s4: rem("20px"),
  s5: rem("25px"),
  s6: rem("30px"),
  s7: rem("40px"),
  s8: rem("50px"),
};

export const device = {
  min: {
    sm: `(min-width: 576px)`,
    md: `(min-width: 768px)`,
    lg: `(min-width: 992px)`,
    xl: `(min-width: 1200px)`,
    xxl: `(min-width: 1400px)`,
  },
  max: {
    sm: `(max-width: 575.98px)`,
    md: `(max-width: 767.98px)`,
    lg: `(max-width: 991.98px)`,
    xl: `(max-width: 1199.98px)`,
    xxl: `(max-width: 1399.98px)`,
  },
};

const theme = {
  typography,
  colors,
  spacing,
  zIndex,
  device,
};

export default theme;
