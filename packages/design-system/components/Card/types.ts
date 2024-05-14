import { ReactNode } from "react";
import {
  LayoutProps,
  PositionProps,
  SpaceProps,
  ColorProps,
} from "styled-system";

export enum Variant {
  DEFAULT = "default",
  DANGER = "danger",
  PRIMARY = "primary",
  WARNING = "warning",
  SUCCESS = "success",
}

export interface CardProps
  extends SpaceProps,
    PositionProps,
    LayoutProps,
    ColorProps {
  /**
   * Content
   */
  children: ReactNode;
  /**
   * TestID
   */
  testId?: string;
  /**
   * Optional hover animation
   */
  hasHoverAnimation?: boolean;
  /**
   * changes styles for ex Outline color
   */
  variant?: Variant;
}
