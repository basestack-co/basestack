import { ReactNode } from "react";
import {
  SpaceProps,
  FlexboxProps,
  LayoutProps,
  TypographyProps,
  ColorProps,
} from "styled-system";
import { Size as IconSize } from "../Icon";

export enum ButtonVariant {
  Primary = "primary",
  PrimaryNeutral = "primaryNeutral",
  Secondary = "secondary",
  Tertiary = "tertiary",
  Neutral = "neutral",
  Outlined = "outlined",
  Danger = "danger",
}

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
  variant?: ButtonVariant;
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
   * Icon Size
   */
  iconSize?: IconSize;
  /**
   * Set button to full width
   */
  fullWidth?: boolean;
}
