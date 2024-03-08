import React from "react";
import { PopupActionProps } from "@basestack/design-system";

export interface LinkItem {
  text: string;
  to: string;
  isExternal?: boolean;
  icon?: string;
}

export interface MobileLinkItem extends LinkItem {
  onClick: (to: string, id: string) => void;
}

export interface SharedNavigationProps {
  rightSideComponent: React.ReactNode;
  projectId: string;
  data?: Array<PopupActionProps>;
  externalLinks: LinkItem[];
  onLogoClick: () => void;
}

export interface DesktopNavigationProps extends SharedNavigationProps {
  isDesktop: boolean;
  onClickMenuButton: () => void;
  pathname: string;
  createProjectText: string;
  onCreateProject: () => void;
  internalLinks: LinkItem[];
}

export interface MobileNavigationProps extends SharedNavigationProps {
  isDrawerOpen: boolean;
  onClose: () => void;
  internalLinks: MobileLinkItem[];
  createProjectText: string;
  projectTitle: string;
  externalLinksText: string;
}
