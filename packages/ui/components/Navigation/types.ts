import { LogoProps } from "@basestack/design-system";
import { AppsDropdownProps } from "../AppsDropdown";
import { AvatarDropdownProps } from "../AvatarDropdown";
import { ProjectsMenuProps } from "../ProjectsMenu";

interface ButtonLinkProps {
  text: string;
  isActive: boolean;
  icon?: string;
  isExternal?: boolean;
  onClick?: () => void;
  href?: string;
}

interface SharedProps {
  avatar: AvatarDropdownProps;
  projects: ProjectsMenuProps;
  onClickLogo: () => void;
  leftLinks?: Array<ButtonLinkProps>;
  rightLinks?: Array<ButtonLinkProps>;
  apps: AppsDropdownProps["data"];
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
