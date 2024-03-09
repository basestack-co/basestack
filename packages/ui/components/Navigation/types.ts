import React from "react";
import { PopupActionProps } from "@basestack/design-system";

export interface LinkItem {
  text: string;
  to: string;
  isExternal?: boolean;
  icon?: string;
  onClick?: (to: string, id: string) => void;
}

export interface DesktopNavigationProps {
  onClickMenuButton: () => void;
  pathname: string;
  createProjectText: string;
  onCreateProject: () => void;
}

export interface MobileNavigationProps {
  isDrawerOpen: boolean;
  onClose: () => void;
  createProjectText: string;
  projectTitle: string;
  externalLinksText: string;
}

export interface GeneralNavigationProps {
  rightSideComponent: React.ReactNode;
  projectId: string;
  data?: Array<PopupActionProps>;
  externalLinks: LinkItem[];
  internalLinks: LinkItem[];
  onLogoClick: () => void;
  isDesktop: boolean;
}
