import React, { Fragment } from "react";
// Types
import {
  DesktopNavigationProps,
  MobileNavigationProps,
  GeneralNavigationProps,
} from "./types";
// Components
import DesktopNavigation from "./Desktop";
import MobileNavigation from "./Mobile";

export interface NavigationProps extends GeneralNavigationProps {
  desktopProps: DesktopNavigationProps;
  mobileProps: MobileNavigationProps;
}

const Navigation = ({
  desktopProps,
  mobileProps,
  ...props
}: NavigationProps) => {
  return (
    <Fragment>
      <DesktopNavigation {...desktopProps} {...props} />
      <MobileNavigation {...mobileProps} {...props} />
    </Fragment>
  );
};

export default Navigation;
