import { ReactNode } from "react";
import { LayoutProps, PositionProps, SpaceProps } from "styled-system";

export enum Variant {
  DEFAULT = "default",
  DANGER = "danger",
  PRIMARY = "primary",
}

export interface CardProps extends SpaceProps, PositionProps, LayoutProps {
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