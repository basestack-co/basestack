import React, { Fragment, useEffect, useState } from "react";
import {  } from "./types";
// Components
import DesktopNavigation from "./Desktop";
import MobileNavigation from "./Mobile";


export type NavigationProps = {}

const Navigation = (props: NavigationProps) => {
  return (
    <Fragment>
      <DesktopNavigation {...props} />
      <MobileNavigation {...props} />
    </Fragment>
  );
};

export default Navigation;
