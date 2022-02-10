import theme from "./theme";

const dropDown = {
  backgroundColor: theme.colors.white,
  minWidth: "210px",
};

const button = {
  fontSize: theme.sizes.xs,
  fontWeight: String(theme.weight.base),
};

const input = {
  fontSize: theme.sizes.xs,
  color: theme.colors.black,
  height: theme.sizes.xl5,
};

const line = {
  width: theme.spacing.xl3,
  height: theme.spacing.xs3,
  color: theme.colors.white,
  marginTop: theme.spacing.xs2,
};

const link = {
  color: theme.colors.grey,
  fontSize: theme.typos.link,
  fontWeight: String(theme.weight.xbase),
};

const separationLine = {
  borderColor: theme.colors.greyBorder,
  height: theme.spacing.xl3,
};

const text = {
  fontSize: theme.typos.text,
  color: theme.colors.black,
  fontWeight: String(theme.weight.xbase),
};

const title = {
  fontSize: theme.typos.title,
  color: theme.colors.white,
  fontWeight: String(theme.weight.xbase),
  fontFamily: theme.type.base,
};

const section = {
  paddingTop: theme.spacing.xl4,
  paddingBottom: theme.spacing.xl4,
  backgroundColor: theme.colors.white,
};

const sectionHeader = {
  backgroundColor: theme.colors.black,
  textColor: theme.colors.white,
};

const select = {
  textColor: theme.colors.white,
  borderColor: theme.colors.white,
  outlineColor: theme.colors.blueFocus,
};

const tabContent = {
  marginTop: theme.spacing.xs2,
  backgroundColor: "transparent",
};

const ListItem = {
  lineColor: theme.colors.greyBorder,
};

// eslint-disable-next-line
export default {
  ...theme,
  components: {
    dropDown,
    button,
    input,
    line,
    link,
    separationLine,
    text,
    title,
    section,
    sectionHeader,
    select,
    tabContent,
    ListItem,
  },
};
