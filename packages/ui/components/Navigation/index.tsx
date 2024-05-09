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
  appsTitle,
  product,
}: NavigationProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    if (!isMobile) {
      setIsDrawerOpen(false);
    }
  }, [isMobile]);

  const sharedProps = {
    apps,
    avatar,
    projects,
    rightLinks,
    leftLinks,
    product,
    onClickLogo,
  };

  return (
    <Fragment>
      <DesktopNavigation
        isMobile={isMobile}
        onOpenDrawer={() => setIsDrawerOpen(true)}
        {...sharedProps}
      />
      <MobileNavigation
        onClose={() => setIsDrawerOpen(false)}
        isDrawerOpen={isDrawerOpen}
        rightLinksTitle={rightLinksTitle}
        appsTitle={appsTitle}
        {...sharedProps}
      />
    </Fragment>
  );
};

export { getAvatarDropdownList, type NavigationProps };
export default Navigation;
