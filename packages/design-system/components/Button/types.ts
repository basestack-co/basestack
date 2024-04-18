import React, { ReactNode, ButtonHTMLAttributes } from "react";
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
  DangerFilled = "dangerFilled",
}

export enum ButtonSize {
  Normal = "normal",
  Medium = "medium",
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
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
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
  /**
   * Show spinner & disable button
   */
  isLoading?: boolean;
  /**
   * Disabled the button
   */
  isDisabled?: boolean;
  /**
   * Button Size
   */
  size?: ButtonSize;
  /**
   * Set Button type
   */
  type?: ButtonHTMLAttributes<string>["type"];
}

export interface StyledButtonProps {
  hasLeftIcon: boolean;
  hasRightIcon: boolean;
  fullWidth: boolean;
  variant: ButtonVariant;
  size: ButtonSize;
  isLoading: boolean;
}
