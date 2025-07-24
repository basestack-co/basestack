import { ButtonVariant, LogoProps } from "@basestack/design-system";
import { SpaceProps } from "styled-system";
import { AppsDropdownProps } from "../AppsDropdown";
import { AvatarDropdownProps } from "../AvatarDropdown";
import { ProjectsMenuProps } from "../ProjectsMenu";

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
}

export interface MobileNavigationUIProps extends SharedProps {
  onClose: () => void;
  isDrawerOpen: boolean;
  rightLinksTitle: string;
  appsTitle: string;
}

export interface NavigationProps extends SharedProps {
  isMobile: boolean;
  rightLinksTitle: string;
  appsTitle: string;
}
