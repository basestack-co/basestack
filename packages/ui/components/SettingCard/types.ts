import React from "react";
import { CardVariant } from "@basestack/design-system";

export interface Props<T> {
  /**
   * Card title
   */
  title: string;
  /**
   * Card description
   */
  description: string;
  /**
   * Card footer text
   */
  text?: string;
  /**
   * Card body content, input, table or other elements
   */
  children?: React.ReactElement;
  /**
   * Card button disable state
   */
  isDisabled?: boolean;
  /**
   * Changes card styles based on variant
   */
  variant?: CardVariant;
  /**
   * Card button loading state
   */
  isLoading?: boolean;
  /**
   * Card footer visibility
   */
  hasFooter?: T;
  /**
   * Adds overlay on top of content
   */
  hasOverlay?: boolean;
  /**
   * Adds a label on the right side of the header
   */
  label?: string;
}

interface ButtonProps {
  /**
   * Card onClick callback
   */
  onClick: () => void;
  /**
   * Card button text
   */
  button: string;
}

export type SettingCardProps<T = boolean> = T extends true
  ? Props<T> & ButtonProps
  : Props<T> & Partial<ButtonProps>;
