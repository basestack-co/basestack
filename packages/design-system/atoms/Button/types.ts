import { ReactNode } from "react";
import { SpaceProps, FlexboxProps } from "styled-system";

export type Variant =
  | "primary"
  | "primaryNeutral"
  | "secondary"
  | "tertiary"
  | "neutral";

export interface ButtonProps extends SpaceProps, FlexboxProps {
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
}
