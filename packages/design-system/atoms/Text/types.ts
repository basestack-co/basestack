import { ReactNode } from "react";
import { SpaceProps, TypographyProps } from "styled-system";

export type Size =
  | "xxLarge"
  | "xLarge"
  | "large"
  | "medium"
  | "small"
  | "xSmall";

export type FontFamily = "roboto" | "robotoFlex";

export interface TextProps extends SpaceProps, TypographyProps {
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
