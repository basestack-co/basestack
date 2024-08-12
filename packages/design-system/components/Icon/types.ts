import { SpaceProps } from "styled-system";

export type Size = "xxLarge" | "xLarge" | "large" | "medium" | "small";

export interface IconProps extends SpaceProps {
  /**
   * Icon name
   */
  icon: string;
  /**
   * Icon size
   */
  size?: Size;
  /**
   * Icon color
   */
  color?: string;
  /**
   * Icon muted color
   */
  muted?: boolean;
}

export type CustomIconNames = "github";

export interface CustomIconProps {
  size: number;
  color?: string;
}

export interface CustomIconCompProps extends CustomIconProps {
  icon: CustomIconNames;
}
