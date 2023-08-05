import { rem } from "polished";

export const typography = {
  roboto: "'Roboto', sans-serif",
  robotoFlex: "'Roboto Flex', sans-serif",
};

export const colors = {
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

  green700: "#10462D",
  green600: "#03582F",
  green500: "#03703C",
  green400: "#05944F",
  green300: "#06C167",
  green200: "#66D19E",
  green100: "#ADDEC9",
  green50: "#E6F2ED",

  red700: "#5A0A00",
  red600: "#870F00",
  red500: "#AB1300",
  red400: "#E11900",
  red300: "#E85C4A",
  red200: "#F1998E",
  red100: "#FED7D2",
  red50: "#FFEFED",

  purple700: "#2E224C",
  purple600: "#453473",
  purple500: "#574191",
  purple400: "#7356BF",
  purple300: "#957FCE",
  purple200: "#C1B5E3",
  purple100: "#E3DDF2",
  purple50: "#F4F1FA",
};

export const zIndex = {
  reactSelect: 111,
  calendar: 111,
  modal: 110,
  popup: 109,
  navigationDrawer: 108,
  backDropCover: 107,
  navigation: 106,
};

export const spacing = {
  s1: rem("4px"),
  s2: rem("8px"),
  s3: rem("12px"),
  s4: rem("16px"),
  s5: rem("20px"),
  s6: rem("30px"),
  s7: rem("40px"),
  s8: rem("50px"),
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

export const theme = {
  typography,
  colors,
  spacing,
  zIndex,
  device,
};
