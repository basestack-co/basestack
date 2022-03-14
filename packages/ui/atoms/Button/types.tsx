import React from "react";
import { SpaceProps, FlexboxProps } from "styled-system";

export type Variant = "filled" | "outline";

export type Type =
  | "primary"
  | "secondary"
  | "tertiary"
  | "neutral"
  | "success"
  | "warning"
  | "danger";

export type Size = "xSmall" | "small" | "normal" | "medium" | "large";

export type Target = "color" | "borderColor" | "backgroundColor";

export interface ButtonProps extends SpaceProps, FlexboxProps {
  /**
   * Change buttons styles from filled and outline
   */
  variant?: Variant;
  /**
   * Button size from predefined list
   */
  size?: Size;
  /**
   * Sets the button disabled with disabled styles
   */
  disabled?: boolean;
  /**
   * Change button element from button to a tag for ex
   */
  as?: React.ElementType;
  /**
   * Href if the button is a button link
   */
  href?: string;
  /**
   * Sets the button width to 100% of viewport
   */
  fullWidth?: boolean;
  /**
   * Button onClick func
   */
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * Choose the types of button from a list
   */
  type?: Type;
  /**
   * Set to true if button has a icon on the right side
   */
  hasRightIcon?: boolean;
  /**
   * Set to true if button has a icon on the left side
   */
  hasLeftIcon?: boolean;
  /**
   * Optional text transform
   */
  textTransform?: string;
}
