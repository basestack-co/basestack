import { rem } from "polished";

const colors = {
  white: "#fff",
  black: "#000",
  blackLight: "#333333",
  grey: "#666666",
  greyAnchor: "#6f6f6f",
  greyLight: "#E5E5E5",
  greyBorder: "#e6e6e6",
  greyDark: "#42526E",
  green: "#91d300",
  blue: "#00b2bd",
  blueLight: "#00d1ca",
  blueFocus: "#49e2ed",
  yellow: "#f7b609",
  orange: "#f05a24",
  red: "#FF6666",
  body: "#e8e4e6",
  //new
  primary: "#004643",
  stroke: "#001e1d",
  secondary: "#abd1c6",
  tertiary: "#e16162",
  highlight: "#f9bc60",
  text: "#001e1d",
  headline: "#001e1d",
  subHeadline: "#0f3433",
};

const type = {
  base: `'Roboto', sans-serif`,
  serif: `'Playfair Display', 'Roboto', sans-serif`,
  icons: `'FontAwesome'`,
};

const weight = {
  xxlight: 100,
  xlight: 200,
  light: 300,
  xbase: 400,
  base: 500,
  bold: 600,
};

const sizes = {
  xs3: rem("3px"),
  xs2: rem("8px"),
  xs: rem("12px"),
  s: rem("14px"),
  m: rem("16px"),
  l: rem("18px"),
  xl: rem("20px"),
  xl2: rem("22px"),
  xl3: rem("26px"),
  xl4: rem("32px"),
  xl5: rem("36px"),
  xl6: rem("48px"),
  xl7: rem("56px"),
};

const typos = {
  input: sizes.xs,
  button: sizes.xs,
  link: sizes.xs,
  text: sizes.l,
  title: sizes.xl6,
};

const spacing = {
  xs3: rem("5px"),
  xs2: rem("10px"),
  xs: rem("12px"),
  s: rem("15px"),
  m: rem("20px"),
  l: rem("24px"),
  xl: rem("30px"),
  xl1: rem("32px"),
  xl2: rem("40px"),
  xl3: rem("50px"),
  xl4: rem("70px"),
  xl5: rem("100px"),
  xl6: rem("120px"),
};

const values = {
  borderSize: "1px",
  headerLine: {
    width: "50px",
    height: "4px",
  },
};

const shadows = {
  base: "0px 8px 16px 0px rgba(0, 0, 0, 0.2)",
  card: "0 .125rem .25rem rgba(0,0,0,.075)",
};

const theme = {
  colors,
  type,
  sizes,
  typos,
  weight,
  values,
  spacing,
  shadows,
};

export default theme;
