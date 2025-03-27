import { SpaceProps } from "styled-system";

export type Size = "small" | "medium" | "large";

export type IconBoxColor = "blue" | "purple" | "gray" | "green";

export type IconBoxVariant = "outlined" | "filled";

export type Gradient = Array<string>;

export interface IconBoxProps extends SpaceProps {
  /**
   * Changes the background color if the variant is outlined
   * */
  backgroundColor?: string;
  /**
   * Changes the icon
   * */
  icon: string;
  /****
   * Icon color
   * */
  color?: IconBoxColor;
  /****
   * Variant filled or outlined
   * */
  variant?: IconBoxVariant;
  /****
   * Changes the border gradient
   * */
  gradient?: Gradient;
  /****
   * Changes the icon color
   * */
  iconColor?: string;
  /****
   * Changes the size
   * */
  size?: Size;
}
