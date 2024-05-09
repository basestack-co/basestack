import React, { Fragment, useEffect, useState } from "react";
// Components
import MobileNavigation from "./Mobile";
import DesktopNavigation from "./Desktop";
// Types"
import { NavigationProps } from "./types";
// Utils
import { getAvatarDropdownList } from "./utils";

const Navigation = ({
  projects,
  apps,
  avatar,
  isMobile = false,
  onClickLogo,
  leftLinks,
  rightLinks,
  rightLinksTitle,
}: NavigationProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    if (!isMobile) {
      setIsDrawerOpen(false);
    }
  }, [isMobile]);

  return (
    <Fragment>
      <DesktopNavigation
        onOpenDrawer={() => setIsDrawerOpen(true)}
        projects={projects}
        apps={apps}
        avatar={avatar}
        isMobile={isMobile}
        onClickLogo={onClickLogo}
        leftLinks={leftLinks}
        rightLinks={rightLinks}
      />
      <MobileNavigation
        onClose={() => setIsDrawerOpen(false)}
        isDrawerOpen={isDrawerOpen}
        projects={projects}
        avatar={avatar}
        onClickLogo={onClickLogo}
        leftLinks={leftLinks}
        rightLinks={rightLinks}
        rightLinksTitle={rightLinksTitle}
      />
    </Fragment>
  );
};

export { getAvatarDropdownList, type NavigationProps };
export default Navigation;
