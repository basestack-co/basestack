import { darken, transparentize } from "polished";
import { typography, colors, spacing, zIndex, device } from "./common";

const shadow = {
  elevation1:
    "0px 1px 1px 0px hsla(0,0%,0%,0.14), 0px 2px 1px -1px hsla(0,0%,0%,0.12), 0px 1px 3px 0px hsla(0,0%,0%,0.2)",
  elevation2:
    "0px 2px 2px 0px hsla(0,0%,0%,0.14), 0px 3px 1px -2px hsla(0,0%,0%,0.12), 0px 1px 5px 0px hsla(0,0%,0%,0.2)",
  elevation3:
    "0px 3px 4px 0px hsla(0,0%,0%,0.14), 0px 3px 3px -2px hsla(0,0%,0%,0.12), 0px 1px 8px 0px hsla(0,0%,0%,0.2)",
  elevation4:
    "0px 4px 5px 0px hsla(0,0%,0%,0.14), 0px 1px 10px 0px hsla(0,0%,0%,0.12), 0px 2px 4px -1px hsla(0,0%,0%,0.2)",
  elevation5:
    "0px 6px 10px 0px hsla(0,0%,0%,0.14), 0px 1px 18px 0px hsla(0,0%,0%,0.12), 0px 3px 5px -1px hsla(0,0%,0%,0.2)",
  elevation6:
    "0px 8px 10px 1px hsla(0,0%,0%,0.14), 0px 3px 14px 2px hsla(0,0%,0%,0.12), 0px 5px 5px -3px hsla(0,0%,0%,0.2)",
};

const button = {
  primary: {
    backgroundColor: colors.blue500,
    color: colors.gray200,
    hover: {
      backgroundColor: colors.blue400,
    },
    spinner: {
      backgroundColor: colors.blue600,
      color: colors.gray200,
    },
  },
  secondary: {
    backgroundColor: colors.gray600,
    color: colors.gray200,
    hover: {
      backgroundColor: colors.gray500,
    },
    spinner: {
      backgroundColor: colors.gray700,
      color: colors.gray200,
    },
  },
  tertiary: {
    backgroundColor: colors.gray700,
    color: colors.gray300,
    hover: {
      backgroundColor: colors.gray600,
    },
    spinner: {
      backgroundColor: colors.gray800,
      color: colors.gray300,
    },
  },
  outlined: {
    backgroundColor: colors.gray800,
    color: colors.gray300,
    border: colors.gray600,
    hover: {
      color: colors.gray400,
      border: colors.gray500,
    },
    spinner: {
      backgroundColor: colors.gray500,
      color: colors.gray300,
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
      backgroundColor: colors.gray600,
      color: colors.gray300,
    },
  },
  primaryNeutral: {
    backgroundColor: "transparent",
    color: colors.gray300,
    hover: {
      color: colors.blue200,
      backgroundColor: transparentize(0.8, colors.blue200),
    },
    active: {
      backgroundColor: transparentize(0.9, colors.blue200),
    },
    spinner: {
      backgroundColor: colors.gray600,
      color: colors.gray300,
    },
  },
  danger: {
    backgroundColor: "transparent",
    color: colors.red300,
    hover: {
      color: colors.red200,
      backgroundColor: transparentize(0.8, colors.red200),
    },
    active: {
      backgroundColor: transparentize(0.9, colors.red200),
    },
    spinner: {
      backgroundColor: colors.gray600,
      color: colors.gray300,
    },
  },
  dangerFilled: {
    backgroundColor: colors.red500,
    color: colors.gray300,
    hover: {
      backgroundColor: colors.red400,
    },
    active: {
      backgroundColor: colors.red500,
    },
    spinner: {
      backgroundColor: colors.red600,
      color: colors.gray300,
    },
  },
};

const calendar = {
  backgroundColor: colors.gray800,
  navigation: {
    button: {
      hover: {
        backgroundColor: colors.gray700,
      },
      disabled: {
        backgroundColor: colors.gray800,
        color: colors.gray500,
      },
    },
  },
  day: {
    color: colors.gray300,
    disabled: {
      color: colors.gray500,
    },
    weekend: {
      color: colors.gray300,
    },
    neighboringMonth: {
      color: colors.gray500,
    },
  },
  title: {
    color: colors.gray300,
    disabled: {
      color: colors.gray500,
      backgroundColor: colors.gray800,
    },
    hover: {
      backgroundColor: colors.gray700,
    },
  },
  now: {
    backgroundColor: colors.gray700,
    hover: {
      backgroundColor: colors.gray600,
    },
  },
  hasActive: {
    backgroundColor: colors.blue500,
    color: colors.gray300,
    hover: {
      backgroundColor: colors.blue500,
    },
  },
  active: {
    backgroundColor: colors.blue500,
    color: colors.gray300,
    hover: {
      backgroundColor: colors.blue500,
    },
  },
  selectRange: {
    backgroundColor: colors.blue500,
    color: colors.gray300,
  },
};

const empty = {
  backgroundColor: colors.gray800,
  icon: {
    backgroundColor: colors.gray800,
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
    backgroundColor: colors.blue500,
    color: colors.gray300,
    hover: { backgroundColor: colors.blue400 },
  },
  primaryNeutral: {
    backgroundColor: "transparent",
    color: colors.gray300,
    hover: {
      color: colors.blue200,
      backgroundColor: transparentize(0.8, colors.blue200),
    },
    active: { backgroundColor: transparentize(0.9, colors.blue200) },
  },
  secondary: {
    backgroundColor: colors.gray600,
    color: colors.gray300,
    hover: { backgroundColor: colors.gray500 },
  },
  neutral: {
    backgroundColor: "transparent",
    color: colors.gray300,
    hover: { backgroundColor: colors.gray600 },
    active: { backgroundColor: colors.gray700 },
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
      color: colors.gray300,
      backgroundColor: colors.blue500,
    },
  },
  translucent: {
    success: {
      color: colors.green200,
      backgroundColor: transparentize(0.8, colors.green200),
    },
    default: {
      color: colors.gray200,
      backgroundColor: transparentize(0.8, colors.gray200),
    },
    info: {
      color: colors.blue200,
      backgroundColor: transparentize(0.8, colors.blue200),
    },
  },
};

const modal = {
  backgroundColor: colors.gray800,
  overlay: {
    backgroundColor: transparentize("0.5", colors.black),
  },
};

const pill = {
  color: colors.gray300,
  backgroundColor: colors.gray700,
  selected: {
    color: colors.gray200,
    backgroundColor: colors.blue500,
  },
  hover: {
    backgroundColor: colors.gray600,
    selected: {
      backgroundColor: colors.blue400,
    },
  },
};

const input = {
  backgroundColor: colors.gray700,
  color: colors.gray300,
  error: {
    backgroundColor: colors.gray700,
    focus: {
      outline: colors.red500,
    },
    icon: {
      color: colors.red500,
    },
  },
  isDarker: {
    backgroundColor: colors.gray800,
  },
  placeholder: {
    color: colors.gray400,
  },
  focus: {
    outline: colors.gray500,
  },
  icon: {
    color: colors.gray400,
  },
};

const textarea = {
  backgroundColor: colors.gray700,
  color: colors.gray300,
  isDarker: {
    backgroundColor: colors.gray800,
  },
  placeholder: {
    color: colors.gray400,
  },
  focus: {
    outline: colors.gray500,
  },
};

const inputGroup = {
  hint: {
    color: colors.gray400,
    error: {
      color: colors.red500,
    },
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

const select = {
  backgroundColor: colors.gray700,
  color: colors.gray300,
  menu: {
    backgroundColor: colors.gray700,
  },
  option: {
    color: colors.gray300,
    backgroundColor: colors.gray700,
    selected: {
      backgroundColor: colors.gray600,
    },
    hover: {
      backgroundColor: colors.gray600,
    },
  },
  placeholder: {
    color: colors.gray500,
  },
  focus: {
    outline: colors.gray600,
  },
  icon: {
    color: colors.gray400,
  },
  indicator: {
    backgroundColor: colors.gray500,
  },
};

const skeleton = {
  backgroundColor: colors.gray800,
  color: colors.gray600,
};

const spinner = {
  backgroundColor: colors.gray600,
  color: colors.blue300,
};

const splash = {
  backgroundColor: colors.gray900,
  loader: {
    backgroundColor: colors.gray600,
    color: colors.blue300,
  },
};

const switchComp = {
  backgroundColor: colors.gray600,
  color: colors.gray300,
  checked: {
    backgroundColor: colors.blue200,
    color: colors.blue500,
  },
  after: {
    backgroundColor: transparentize(0.7, colors.gray300),
    checked: {
      backgroundColor: transparentize(0.7, colors.blue500),
    },
  },
};

const checkbox = {
  backgroundColor: "transparent",
  border: colors.gray600,
  label: {
    color: colors.gray300,
  },
  hover: {
    border: colors.gray500,
  },
  checked: {
    icon: colors.gray800,
    backgroundColor: colors.gray500,
    border: colors.gray500,
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

const table = {
  backgroundColor: colors.gray900,
  border: colors.gray700,
  link: {
    color: colors.blue300,
  },
};

const tabs = {
  backgroundColor: "transparent",
  color: colors.gray300,
  tab: {
    backgroundColor: "transparent",
    border: colors.gray600,
    hover: { backgroundColor: colors.gray700 },
  },
  button: {
    backgroundColor: colors.gray700,
    hover: { backgroundColor: colors.gray600 },
    active: {
      backgroundColor: colors.gray600,
      text: {
        color: colors.gray300,
      },
    },
  },
  slider: {
    backgroundColor: colors.gray400,
  },
};

const tooltip = {
  backgroundColor: colors.gray700,
  color: colors.gray300,
};

const horizontalRule = {
  backgroundColor: colors.gray700,
};

const copyCard = {
  backgroundColor: colors.gray700,
  title: {
    backgroundColor: colors.gray600,
  },
};

const pagination = {
  number: {
    backgroundColor: colors.gray700,
  },
};

const iconBox = {
  outlined: {
    backgroundColor: colors.gray800,
    gradient: [colors.gray700, colors.gray600, colors.gray500, colors.gray700],
  },
};

const theme = {
  isDarkMode: true,
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
  checkbox,
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
  typography,
  colors,
  spacing,
  zIndex,
  shadow,
  device,
};

export default theme;
