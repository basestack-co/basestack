import { typography, colors, spacing, zIndex, shadow, device } from "./index";
import { darken, lighten, transparentize } from "polished";

const body = {
  backgroundColor: colors.gray900,
};

const navigation = {
  backgroundColor: colors.gray800,
  divider: {
    backgroundColor: colors.gray600,
  },
  button: {
    underline: colors.blue400,
  },
};

const button = {
  primary: {
    backgroundColor: colors.blue500,
    color: colors.gray200,
    hover: {
      backgroundColor: darken(0.1, colors.blue500),
    },
    spinner: {
      backgroundColor: colors.blue400,
      color: colors.gray300,
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
    backgroundColor: colors.gray700,
    color: colors.gray300,
    hover: {
      backgroundColor: colors.gray600,
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
    color: colors.gray300,
    hover: {
      backgroundColor: colors.gray700,
    },
    active: {
      backgroundColor: colors.gray600,
    },
    spinner: {
      backgroundColor: colors.gray200,
      color: colors.black,
    },
  },
  primaryNeutral: {
    backgroundColor: "transparent",
    color: colors.gray300,
    hover: {
      color: colors.blue600,
      backgroundColor: colors.blue200,
    },
    active: {
      backgroundColor: colors.blue300,
    },
    spinner: {
      backgroundColor: colors.gray200,
      color: colors.black,
    },
  },
  danger: {
    backgroundColor: "transparent",
    color: colors.red300,
    hover: {
      color: colors.red600,
      backgroundColor: colors.red200,
    },
    active: {
      backgroundColor: colors.red300,
    },
    spinner: {
      backgroundColor: colors.gray200,
      color: colors.red400,
    },
  },
  dangerFilled: {
    backgroundColor: colors.red500,
    color: colors.gray300,
    hover: {
      backgroundColor: colors.red600,
    },
    active: {
      backgroundColor: colors.red500,
    },
    spinner: {
      backgroundColor: colors.red200,
      color: colors.white,
    },
  },
};

const card = {
  backgroundColor: colors.gray800,
};

const text = {
  color: colors.gray300,
  muted: colors.gray400,
};

const icon = {
  color: colors.gray300,
  muted: colors.gray400,
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
    color: colors.gray300,
    hover: { backgroundColor: colors.gray700 },
    active: { backgroundColor: colors.gray600 },
  },
};

const label = {
  solid: {
    success: {
      color: colors.gray100,
      backgroundColor: colors.green600,
    },
    default: {
      color: colors.gray300,
      backgroundColor: colors.gray600,
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
  backgroundColor: colors.gray800,
  color: colors.gray300,
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
    backgroundColor: colors.gray800,
  },
  placeholder: {
    color: colors.gray400,
  },
  focus: {
    outline: colors.gray600,
  },
  icon: {
    color: colors.gray500,
  },
};

const segment = {
  backgroundColor: colors.gray800,
  button: {
    hover: {
      backgroundColor: colors.gray700,
    },
  },
  slider: {
    backgroundColor: colors.gray600,
  },
  icon: {
    color: colors.gray300,
  },
};

const splash = {
  backgroundColor: colors.gray900,
  loader: {
    backgroundColor: colors.gray600,
    color: colors.blue400,
  },
};

const popup = {
  backgroundColor: colors.gray800,
};

const popupActions = {
  backgroundColor: colors.gray800,
  button: {
    backgroundColor: "transparent",
    hover: {
      backgroundColor: colors.gray700,
    },
    active: {
      backgroundColor: colors.gray600,
    },
  },
};

const theme = {
  body,
  navigation,
  button,
  card,
  text,
  icon,
  iconButton,
  label,
  input,
  segment,
  splash,
  popup,
  popupActions,
  typography,
  colors,
  spacing,
  zIndex,
  shadow,
  device,
};

export default theme;
