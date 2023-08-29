import type { ReactNode } from "react";
import type { ButtonProps } from "../Button";
export type Size = "small" | "medium" | "large" | "fullWidth";

export interface ModalProps {
  /**
   * Modal size
   */
  size?: Size;
  /**
   * Modal title
   */
  title: string;
  /**
   * onClose callback
   */
  onClose: () => void;
  /**
   * Footer buttons
   */
  buttons: Array<ButtonProps>;
  /**
   * If modal is open
   */
  isOpen: boolean;
  /**
   * Sets a min-height to the sheet modal
   */
  minHeight?: number;
  /**
   * Sets the modal to full height in mobile
   */
  expandMobile?: boolean;
  /**
   * A React Element
   */
  children: ReactNode;
  /**
   * Callback when the animation ends
   */
  onAnimationEnd?: () => void;
  /**
   * Enables or disables close modal on click outside main content
   */
  closeOnClickOutside?: boolean;
}
