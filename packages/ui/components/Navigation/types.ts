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
}

interface SharedProps {
  isMobile: boolean;
  apps: AppsDropdownProps["data"];
  avatar: AvatarDropdownProps;
  projects: ProjectsMenuProps;
  onClickLogo: () => void;
  leftLinks?: Array<Link>;
  rightLinks?: Array<Link>;
}

export interface DesktopNavigationUIProps extends SharedProps {
  onOpenDrawer: () => void;
}

export interface NavigationProps extends SharedProps {
  data?: Array<PopupActionProps>;
}
