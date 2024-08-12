import React from "react";
import { SpaceProps, FlexboxProps, PositionProps } from "styled-system";

export type Size = "xLarge" | "large" | "mediumLarge" | "medium" | "small";

export type Variant =
  | "primary"
  | "primaryNeutral"
  | "secondary"
  | "secondaryDark"
  | "neutral";

export interface IconButtonProps
  extends SpaceProps,
    FlexboxProps,
    PositionProps {
  /**
   * Change button variant
   */
  variant?: Variant;
  /**
   * onClick function
   */
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * Icon
   */
  icon: string;
  /**
   * Optional size
   */
  size?: Size;
  /**
   * isDisabled state
   */
  isDisabled?: boolean;
}
