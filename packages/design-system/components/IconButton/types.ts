import { SpaceProps, FlexboxProps, PositionProps } from "styled-system";

export type Size = "xLarge" | "large" | "medium" | "small";

export type Variant = "primary" | "primaryNeutral" | "secondary" | "neutral";

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
  onClick: () => void;
  /**
   * Icon
   */
  icon: string;
  /**
   * Optional size
   */
  size?: Size;
}
