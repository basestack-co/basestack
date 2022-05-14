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

  blue700: "#102C60",
  blue600: "#174291",
  blue500: "#1E54B7",
  blue400: "#276EF1",
  blue300: "#5B91F5",
  blue200: "#A0BFF8",
  blue100: "#D4E2FC",
  blue50: "#EFF3FE",

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
  modal: 101,
  navigation: 100,
};

const spacing = {
  s1: rem("4px"),
  s2: rem("8px"),
  s3: rem("12px"),
  s4: rem("16px"),
  s5: rem("20px"),
  s6: rem("30px"),
  s7: rem("40px"),
  s8: rem("50px"),
};

const shadow = {
  elevation1: "rgba(0, 0, 0, 0.05) 0px 1px 2px 0px",
  elevation2:
    "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
  elevation3:
    "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
  elevation4:
    "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
  elevation5:
    "rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px",
  elevation6: "box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px",
};

export const device = {
  min: {
    sm: "(min-width: 576px)",
    md: "(min-width: 768px)",
    lg: "(min-width: 992px)",
    xl: "(min-width: 1200px)",
    xxl: "(min-width: 1400px)",
  },
  max: {
    sm: "(max-width: 575.98px)",
    md: "(max-width: 767.98px)",
    lg: "(max-width: 991.98px)",
    xl: "(max-width: 1199.98px)",
    xxl: "(max-width: 1399.98px)",
  },
};

const theme = {
  typography,
  colors,
  spacing,
  zIndex,
  shadow,
  device,
};

export default theme;
