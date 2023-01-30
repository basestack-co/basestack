import React, { Fragment } from "react";
import { useTheme } from "styled-components";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();

  return (
    <Fragment>
      <h1>This is a Layout </h1>
      {children}
    </Fragment>
  );
};

export default MainLayout;
