import { typography, colors, spacing, zIndex, shadow, device } from "./index";
import { darken, lighten } from "polished";

const body = {
  backgroundColor: colors.gray800,
};

const button = {
  primary: {
    backgroundColor: colors.primary,
    color: colors.white,
    hover: {
      backgroundColor: darken(0.1, colors.primary),
    },
    spinner: {
      backgroundColor: colors.blue500,
      color: colors.white,
    },
  },
  secondary: {
    backgroundColor: colors.black,
    color: colors.white,
    hover: {
      backgroundColor: lighten(0.2, colors.black),
    },
    spinner: {
      backgroundColor: colors.gray500,
      color: colors.white,
    },
  },
  tertiary: {
    backgroundColor: colors.gray100,
    color: colors.black,
    hover: {
      backgroundColor: colors.gray200,
    },
    spinner: {
      backgroundColor: colors.gray300,
      color: colors.black,
    },
  },
  outlined: {
    backgroundColor: "transparent",
    color: colors.black,
    border: colors.black,
    hover: {
      color: lighten(0.3, colors.black),
      border: lighten(0.3, colors.black),
    },
    spinner: {
      backgroundColor: colors.gray200,
      color: colors.black,
    },
  },
  neutral: {
    backgroundColor: "transparent",
    color: colors.black,
    hover: {
      backgroundColor: colors.gray100,
    },
    active: {
      backgroundColor: colors.gray200,
    },
    spinner: {
      backgroundColor: colors.gray200,
      color: colors.black,
    },
  },
  primaryNeutral: {
    backgroundColor: "transparent",
    color: colors.black,
    hover: {
      color: colors.blue400,
      backgroundColor: colors.blue50,
    },
    active: {
      backgroundColor: colors.blue100,
    },
    spinner: {
      backgroundColor: colors.gray200,
      color: colors.black,
    },
  },
  danger: {
    backgroundColor: "transparent",
    color: colors.red400,
    hover: {
      backgroundColor: colors.red50,
    },
    active: {
      backgroundColor: colors.red100,
    },
    spinner: {
      backgroundColor: colors.gray200,
      color: colors.red400,
    },
  },
  dangerFilled: {
    backgroundColor: colors.red400,
    color: colors.white,
    hover: {
      backgroundColor: colors.red500,
    },
    active: {
      backgroundColor: colors.red400,
    },
    spinner: {
      backgroundColor: colors.red200,
      color: colors.white,
    },
  },
};

const theme = {
  body,
  button,
  typography,
  colors,
  spacing,
  zIndex,
  shadow,
  device,
};

export default theme;
