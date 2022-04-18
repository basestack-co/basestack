import theme from "ui/theme";

export type ThemeInterface = typeof theme;

declare module "styled-components" {
  interface DefaultTheme extends ThemeInterface {}
}
