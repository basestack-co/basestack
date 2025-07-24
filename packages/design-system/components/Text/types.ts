import { ReactNode } from "react";
import {
  FlexboxProps,
  LayoutProps,
  SpaceProps,
  TypographyProps,
} from "styled-system";

export type Size =
  | "xxLarge"
  | "xLarge"
  | "large"
  | "medium"
  | "small"
  | "xSmall";

export type FontFamily = "roboto" | "robotoFlex";

export interface TextProps
  extends SpaceProps,
    TypographyProps,
    FlexboxProps,
    LayoutProps {
  /**
   * Change text tag
   */
  as?: string;
  /**
   * Change text size
   */
  size?: Size;
  /**
   * Changes text to gray
   */
  muted?: boolean;
  /**
   * Change text color
   */
  color?: string;
  /**
   * Text
   */
  children: ReactNode;
  /**
   * Change text fontFamily
   */
  fontFamily?: FontFamily;
  /**
   * Truncate text to one line
   */
  lineTruncate?: boolean;
}
