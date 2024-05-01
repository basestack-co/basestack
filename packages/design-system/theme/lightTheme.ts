import { darken, lighten, transparentize } from "polished";
import { typography, colors, spacing, zIndex, device } from "./common";

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
  elevation6: "rgba(0, 0, 0, 0.25) 0px 25px 50px -12px",
};

const background = {
  dark: colors.gray100,
  default: colors.gray50,
  light: colors.gray10,
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
    backgroundColor: colors.white,
    color: colors.black,
    border: colors.gray300,
    hover: {
      color: colors.black,
      border: colors.gray500,
    },
    spinner: {
      backgroundColor: colors.gray200,
      color: colors.gray700,
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
      color: colors.red400,
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

const calendar = {
  backgroundColor: colors.white,
  navigation: {
    button: {
      hover: {
        backgroundColor: colors.gray100,
      },
      disabled: {
        backgroundColor: colors.white,
        color: colors.gray400,
      },
    },
  },
  day: {
    color: colors.black,
    disabled: {
      color: colors.gray400,
    },
    weekend: {
      color: colors.black,
    },
    neighboringMonth: {
      color: colors.gray400,
    },
  },
  title: {
    color: colors.black,
    disabled: {
      color: colors.gray400,
      backgroundColor: colors.white,
    },
    hover: {
      backgroundColor: colors.gray100,
    },
  },
  now: {
    backgroundColor: colors.gray100,
    hover: {
      backgroundColor: colors.gray200,
    },
  },
  hasActive: {
    backgroundColor: colors.primary,
    color: colors.white,
    hover: {
      backgroundColor: colors.primary,
    },
  },
  active: {
    backgroundColor: colors.primary,
    color: colors.white,
    hover: {
      backgroundColor: colors.primary,
    },
  },
  selectRange: {
    backgroundColor: colors.primary,
    color: colors.white,
  },
};

const empty = {
  backgroundColor: colors.gray100,
  icon: {
    backgroundColor: colors.gray100,
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
    color: colors.black,
    hover: { backgroundColor: colors.gray200 },
  },
  secondaryDark: {
    backgroundColor: colors.gray200,
    color: colors.black,
    hover: { backgroundColor: colors.gray300 },
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
    danger: {
      color: colors.white,
      backgroundColor: colors.red400,
    },
    warning: {
      color: colors.black,
      backgroundColor: colors.yellow400,
    },
    success: {
      color: colors.white,
      backgroundColor: colors.green400,
    },
    default: {
      color: colors.black,
      backgroundColor: colors.gray200,
    },
    info: {
      color: colors.white,
      backgroundColor: colors.primary,
    },
  },
  translucent: {
    danger: {
      color: colors.red600,
      backgroundColor: transparentize(0.9, colors.red400),
    },
    warning: {
      color: colors.yellow700,
      backgroundColor: transparentize(0.8, colors.yellow400),
    },
    success: {
      color: colors.green600,
      backgroundColor: transparentize(0.9, colors.green400),
    },
    default: {
      color: colors.gray600,
      backgroundColor: transparentize(0.9, colors.gray400),
    },
    info: {
      color: colors.blue600,
      backgroundColor: transparentize(0.9, colors.blue400),
    },
  },
};

const modal = {
  backgroundColor: colors.white,
  overlay: {
    backgroundColor: transparentize("0.5", colors.black),
  },
};

const pill = {
  color: colors.black,
  backgroundColor: colors.gray100,
  selected: {
    color: colors.primary,
    backgroundColor: colors.blue100,
  },
  hover: {
    backgroundColor: colors.gray200,
    selected: {
      backgroundColor: darken(0.04, colors.blue100),
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
    color: colors.gray500,
  },
};

const textarea = {
  backgroundColor: colors.gray50,
  color: colors.black,
  isDarker: {
    backgroundColor: colors.gray100,
  },
  placeholder: {
    color: colors.gray500,
  },
  focus: {
    outline: colors.black,
  },
  error: {
    backgroundColor: colors.red50,
    focus: {
      outline: colors.red200,
    },
  },
};

const inputGroup = {
  hint: {
    color: colors.gray500,
    error: {
      color: colors.red400,
    },
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

const select = {
  backgroundColor: colors.gray50,
  color: colors.black,
  menu: {
    backgroundColor: colors.white,
  },
  option: {
    color: colors.black,
    backgroundColor: colors.white,
    selected: {
      backgroundColor: colors.gray100,
    },
    hover: {
      backgroundColor: colors.gray100,
    },
  },
  placeholder: {
    color: colors.gray500,
  },
  focus: {
    outline: colors.black,
  },
  icon: {
    color: colors.gray500,
  },
  indicator: {
    backgroundColor: colors.gray200,
  },
};

const skeleton = {
  backgroundColor: colors.white,
  color: colors.gray100,
};

const spinner = {
  backgroundColor: colors.gray100,
  color: colors.primary,
};

const splash = {
  backgroundColor: colors.gray50,
  loader: {
    backgroundColor: colors.gray300,
    color: colors.primary,
  },
};

const switchComp = {
  backgroundColor: colors.gray200,
  color: colors.white,
  checked: {
    backgroundColor: colors.blue200,
    color: colors.primary,
  },
  after: {
    backgroundColor: transparentize(0.6, colors.white),
    checked: {
      backgroundColor: transparentize(0.9, colors.primary),
    },
  },
};

const checkbox = {
  backgroundColor: "transparent",
  border: colors.gray400,
  label: {
    color: colors.black,
  },
  hover: {
    border: colors.black,
  },
  checked: {
    icon: colors.white,
    backgroundColor: colors.black,
    border: colors.black,
  },
  button: {
    border: colors.black,
  },
};

const popup = {
  backgroundColor: colors.white,
};

const popupActions = {
  backgroundColor: colors.white,
  button: {
    backgroundColor: "transparent",
    hover: {
      backgroundColor: colors.gray100,
    },
    active: {
      backgroundColor: colors.gray200,
    },
  },
};

const table = {
  backgroundColor: colors.gray50,
  border: colors.gray200,
  link: {
    color: colors.primary,
  },
};

const tabs = {
  backgroundColor: colors.white,
  color: colors.black,
  tab: {
    backgroundColor: "transparent",
    border: colors.gray200,
    hover: { backgroundColor: colors.gray100 },
  },
  button: {
    backgroundColor: colors.gray50,
    hover: { backgroundColor: colors.gray200 },
    active: {
      backgroundColor: colors.gray200,
      text: {
        color: colors.black,
      },
    },
  },
  slider: {
    backgroundColor: colors.black,
  },
};

const tooltip = {
  backgroundColor: colors.gray800,
  color: colors.white,
};

const horizontalRule = {
  backgroundColor: colors.gray100,
  darker: {
    backgroundColor: colors.gray200,
  },
};

const copyCard = {
  backgroundColor: colors.gray50,
  title: {
    backgroundColor: colors.gray100,
  },
};

const pagination = {
  number: {
    backgroundColor: colors.gray100,
  },
};

const iconBox = {
  outlined: {
    backgroundColor: colors.white,
    gradient: [colors.gray50, colors.gray300, colors.gray400, colors.gray50],
  },
};

const banner = {
  solid: {
    info: {
      backgroundColor: colors.blue400,
      color: colors.white,
    },
    warning: {
      backgroundColor: colors.yellow400,
      color: colors.black,
    },
    success: {
      backgroundColor: colors.green400,
      color: colors.white,
    },
    danger: {
      backgroundColor: colors.red400,
      color: colors.white,
    },
  },
  translucent: {
    info: {
      backgroundColor: transparentize(0.9, colors.blue400),
      color: colors.black,
    },
    warning: {
      backgroundColor: transparentize(0.8, colors.yellow400),
      color: colors.black,
    },
    success: {
      backgroundColor: transparentize(0.9, colors.green400),
      color: colors.black,
    },
    danger: {
      backgroundColor: transparentize(0.9, colors.red400),
      color: colors.black,
    },
  },
};

const theme = {
  isDarkMode: false,
  button,
  card,
  text,
  icon,
  iconButton,
  label,
  input,
  segment,
  splash,
  checkbox,
  popup,
  popupActions,
  table,
  horizontalRule,
  calendar,
  empty,
  inputGroup,
  modal,
  pill,
  select,
  skeleton,
  spinner,
  switchComp,
  tabs,
  tooltip,
  textarea,
  copyCard,
  pagination,
  iconBox,
  banner,
  background,
  typography,
  colors,
  spacing,
  zIndex,
  shadow,
  device,
};

export default theme;
