export type Size = "small" | "medium" | "large" | "fullWidth";

export type Button = {
  text: string;
  onClick: () => void;
};

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
  buttons: Array<Button>;
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
}
