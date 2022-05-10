import { SpaceProps, FlexboxProps, PositionProps } from "styled-system";

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
   * Optional Icon
   */
  icon: string;
}
