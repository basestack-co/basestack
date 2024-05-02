import React, { Fragment, useEffect, useState } from "react";
import { useMedia } from "react-use";
import { useTheme } from "styled-components";
// Components
import { PopupActionProps } from "@basestack/design-system";
import MobileNavigation from "./Mobile";
import DesktopNavigation from "./Desktop";

export interface NavigationProps {
  data?: Array<PopupActionProps>;
  hasSubscription?: boolean;
}

const Navigation = ({ data, hasSubscription }: NavigationProps) => {
  const theme = useTheme();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isMobile = useMedia(theme.device.max.lg, false);

  useEffect(() => {
    if (!isMobile) {
      setIsDrawerOpen(false);
    }
  }, [isMobile]);

  return (
    <Fragment>
      <DesktopNavigation
        onClickMenuButton={() => setIsDrawerOpen(true)}
        isDesktop={!isMobile}
        data={data}
        hasSubscription={hasSubscription}
      />
      <MobileNavigation
        data={data}
        onClose={() => setIsDrawerOpen(false)}
        isDrawerOpen={isDrawerOpen}
        hasSubscription={hasSubscription}
      />
    </Fragment>
  );
};

export default Navigation;
