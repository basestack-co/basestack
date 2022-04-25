import { ReactNode } from "react";
import { SpaceProps, FlexboxProps } from "styled-system";

export type Variant = "primary" | "secondary" | "tertiary" | "neutral";

export interface ButtonProps extends SpaceProps, FlexboxProps {
  /**
   * Change button or link
   */
  type?: "button" | "link";
  /**
   * Change button type
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
}
