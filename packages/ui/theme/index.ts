import { rem } from "polished";
const typography = {
  fontFamily: "'Source Sans Pro', sans-serif",
};

const colors = {
  primary: "#003049",
  secondary: "#F77F00",

  info: "#009DF8",
  success: "#27AE60",
  warning: "#FCBF49",
  error: "#D62828",
  errorLight: "#FBD3D3",

  white: "#FFFFFF",
  black1: "#000000",
  black2: "#1D1D1D",

  gray1: "#333333",
  gray2: "#4F4F4F",
  gray3: "#828282",
  gray4: "#BDBDBD",
  gray5: "#E0E0E0",
  gray6: "#ECEDED",
  gray7: "#f9f9fb",

  bg1: "#F1F1E6",
  bg2: "#FAF7EA",
  bg3: "#EAE2B7",

  lightBlue: "#dbeaff",
  blue1: "#2F80ED",
  // Gray5
  borderColor: "#E0E0E0",
};

const sizes = {
  sideNav: {
    collapsed: "60px",
    fullWidth: "200px",
  },
  mobileNav: {
    height: "50px",
  },
  sideMenu: "200px",
};

const values = {
  zIndex: {
    splashScreen: 104,
    searchResultsModal: 103,
    modal: 102,
    mobileNav: 101,
    sideNav: 100,
    profileStickyTabs: 99,
    dropdown: 98,
    sideMenu: 97,
  },
  boxShadow: {
    elevation1: "0 1px 0 rgba(17, 17, 26, 0.05), 0 0 8px rgba(17, 17, 26, 0.1)",
    elevation2: "0 0 16px rgba(17, 17, 26, 0.1)",
    elevation3:
      "0 4px 16px rgba(17, 17, 26, 0.05), 0 8px 32px rgba(17, 17, 26, 0.05)",
    elevation4:
      "0 4px 16px rgba(17, 17, 26, 0.1), 0 8px 32px rgba(17, 17, 26, 0.05)",
    elevation5:
      "0 8px 24px rgba(17, 17, 26, 0.1), 0 16px 48px rgba(17, 17, 26, 0.1)",
  },
  dropShadow: {
    elevation1: "0 1px 3px rgba(0,0,0,0.12)",
    elevation2: "0 3px 6px rgba(0,0,0,0.16)",
    elevation3: "0 10px 20px rgba(0,0,0,0.19)",
  },
  borderRadius: {
    small: "4px",
    medium: "8px",
    large: "12px",
  },
};

const spacing = {
  s1: rem("4px"),
  s2: rem("8px"),
  s3: rem("16px"),
  s4: rem("24px"),
  s5: rem("48px"),
  s6: rem("60px"),
  s7: rem("72px"),
  s8: rem("84px"),
  s9: rem("96px"),
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
  sizes,
  values,
  device,
};

export default theme;
