import type { ReactNode } from "react";

export interface ButtonLinkProps {
  /**
   * Set button link active
   */
  isActive: boolean;
  /**
   * Set button link active
   */
  children: ReactNode;
  /**
   * Link href
   */
  href: string;
}

export interface NavigationProps {
  /**
   * create flag callback
   */
  onCreateFlag: () => void;
  /**
   * pathname
   */
  pathname: string;
}
