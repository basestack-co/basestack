import { darken, lighten, transparentize } from "polished";
import { typography, colors, spacing, zIndex, shadow, device } from "./index";

const body = {
  backgroundColor: colors.gray50,
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

const card = {
  backgroundColor: colors.white,
};

const text = {
  color: colors.black,
  muted: colors.gray500,
};

const icon = {
  color: colors.black,
  muted: colors.gray600,
};

const iconButton = {
  primary: {
    backgroundColor: colors.primary,
    color: colors.white,
    hover: { backgroundColor: darken(0.1, colors.primary) },
  },
  primaryNeutral: {
    backgroundColor: "transparent",
    color: colors.black,
    hover: { color: colors.blue400, backgroundColor: colors.blue50 },
    active: { backgroundColor: colors.blue100 },
  },
  secondary: {
    backgroundColor: colors.gray100,
    color: colors.white,
    hover: { backgroundColor: colors.gray200 },
  },
  neutral: {
    backgroundColor: "transparent",
    color: colors.black,
    hover: { backgroundColor: colors.gray100 },
    active: { backgroundColor: colors.gray200 },
  },
};

const label = {
  solid: {
    success: {
      color: colors.white,
      backgroundColor: colors.green400,
    },
    default: {
      color: colors.gray600,
      backgroundColor: colors.gray200,
    },
    info: {
      color: colors.white,
      backgroundColor: colors.primary,
    },
  },
  translucent: {
    success: {
      color: colors.green600,
      backgroundColor: transparentize(0.9, colors.green400),
    },
    default: {
      color: colors.gray600,
      backgroundColor: transparentize(0.9, colors.gray400),
    },
    info: {
      color: colors.blue500,
      backgroundColor: transparentize(0.9, colors.blue400),
    },
  },
};

const input = {
  backgroundColor: colors.gray50,
  color: colors.black,
  error: {
    backgroundColor: colors.red50,
    focus: {
      outline: colors.red200,
    },
    icon: {
      color: colors.red400,
    },
  },
  isDarker: {
    backgroundColor: colors.gray100,
  },
  placeholder: {
    color: colors.gray500,
  },
  focus: {
    outline: colors.black,
  },
  icon: {
    color: colors.gray400,
  },
};

const segment = {
  backgroundColor: colors.gray100,
  button: {
    hover: {
      backgroundColor: colors.gray200,
    },
  },
  slider: {
    backgroundColor: colors.white,
  },
  icon: {
    color: colors.black,
  },
};

const theme = {
  body,
  button,
  card,
  text,
  icon,
  iconButton,
  label,
  input,
  segment,
  typography,
  colors,
  spacing,
  zIndex,
  shadow,
  device,
};

export default theme;
