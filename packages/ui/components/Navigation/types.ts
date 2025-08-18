import type { ButtonVariant, LogoProps } from "@basestack/design-system";
import type { SpaceProps } from "styled-system";
import type { AppsDropdownProps } from "../AppsDropdown";
import type { AvatarDropdownProps } from "../AvatarDropdown";
import type { ProjectsMenuProps } from "../ProjectsMenu";

export type ButtonType = "button" | "link";

interface ListItemProps {
  type: ButtonType;
  text: string;
  isActive: boolean;
  buttonVariant?: ButtonVariant;
  icon?: string;
  onClick?: () => void;
  href?: string;
  space?: SpaceProps;
}

interface SharedProps {
  avatar: AvatarDropdownProps;
  projects: ProjectsMenuProps;
  onClickLogo: () => void;
  leftLinks?: Array<ListItemProps>;
  rightLinks?: Array<ListItemProps>;
  apps?: AppsDropdownProps["data"];
  product: LogoProps["product"];
}

export interface DesktopNavigationUIProps extends SharedProps {
  onOpenDrawer: () => void;
  isMobile: boolean;
  isDrawerOpen: boolean;
}

export interface MobileNavigationUIProps extends SharedProps {
  onClose: () => void;
  rightLinksTitle: string;
  appsTitle: string;
  isDrawerOpen: boolean;
}

export interface NavigationProps extends SharedProps {
  isMobile: boolean;
  rightLinksTitle: string;
  appsTitle: string;
}
