import { PopupActionProps } from "@basestack/design-system";
import { AppsDropdownProps } from "../AppsDropdown";
import { AvatarDropdownProps } from "../AvatarDropdown";
import { ProjectsMenuProps } from "../ProjectsMenu";

export interface Link {
  text: string;
  onClick: () => void;
  isActive: boolean;
  isExternal: boolean;
  href: string;
  icon: string;
}

interface SharedProps {
  avatar: AvatarDropdownProps;
  projects: ProjectsMenuProps;
  onClickLogo: () => void;
  leftLinks?: Array<Link>;
  rightLinks?: Array<Link>;
}

export interface DesktopNavigationUIProps extends SharedProps {
  apps: AppsDropdownProps["data"];
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
  apps: AppsDropdownProps["data"];
  data?: Array<PopupActionProps>;
  isMobile: boolean;
  rightLinksTitle: string;
  appsTitle: string;
}
