import React, { Fragment } from "react";
import { useTheme } from "styled-components";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();

  return (
    <Fragment>
      {children}
    </Fragment>
  );
};

export default MainLayout;
