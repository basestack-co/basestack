import { ReactNode } from "react";
import {
  SpaceProps,
  FlexboxProps,
  LayoutProps,
  TypographyProps,
  ColorProps,
} from "styled-system";

export type Variant =
  | "primary"
  | "primaryNeutral"
  | "secondary"
  | "tertiary"
  | "neutral"
  | "outlined";

export interface ButtonProps
  extends SpaceProps,
    FlexboxProps,
    LayoutProps,
    TypographyProps,
    ColorProps {
  /**
   * Change button or link
   */
  as?: string;
  /**
   * Change button variant
   */
  variant?: Variant;
  /**
   * Text
   */
  children: ReactNode;
  /**
   * onClick function
   */
  onClick?: () => void;
  /**
   * Optional Icon
   */
  icon?: string;
  /**
   * Icon Placement
   */
  iconPlacement?: "left" | "right";
  /**
   * Set button to full width
   */
  fullWidth?: boolean;
  /**
   * Href for button links
   */
  href?: string;
}
