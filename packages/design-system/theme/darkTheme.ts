import { typography, colors, spacing, zIndex, shadow, device } from "./index";
import { navigation, settingsCard } from "./feature-flags/darkTheme";
import { darken, lighten, transparentize } from "polished";

const body = {
  backgroundColor: colors.gray900,
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
    backgroundColor: colors.gray600,
    color: colors.gray200,
    hover: {
      backgroundColor: colors.gray700,
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

const calendar = {};

const calendarInput = {};

const empty = {
  backgroundColor: colors.gray800,
  icon: {
    color: colors.primary,
    backgroundColor: colors.blue100,
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

const loader = {};

const modal = {
  backgroundColor: colors.gray800,
  overlay: {
    backgroundColor: transparentize("0.5", colors.black),
  },
};

const pagination = {};

const pill = {};

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
    color: colors.gray500,
  },
  focus: {
    outline: colors.gray600,
  },
  icon: {
    color: colors.gray500,
  },
};

const textarea = {
  backgroundColor: colors.gray700,
  color: colors.gray300,
  isDarker: {
    backgroundColor: colors.gray800,
  },
  placeholder: {
    color: colors.gray500,
  },
  focus: {
    outline: colors.gray600,
  },
};

const inputGroup = {};

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
  button: {
    backgroundColor: "transparent",
    border: colors.gray600,
    hover: { backgroundColor: colors.gray700 },
  },
  slider: {
    backgroundColor: colors.gray400,
  },
};

const tooltip = {
  backgroundColor: colors.gray800,
  color: colors.white,
};

const horizontalRule = {
  backgroundColor: colors.gray700,
};

const theme = {
  navigation,
  settingsCard,
  body,
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
  table,
  horizontalRule,
  calendar,
  calendarInput,
  empty,
  inputGroup,
  loader,
  modal,
  pagination,
  pill,
  select,
  skeleton,
  spinner,
  switchComp,
  tabs,
  tooltip,
  textarea,
  typography,
  colors,
  spacing,
  zIndex,
  shadow,
  device,
};

export default theme;
