import React, { Fragment } from "react";
// Store
import { useSelector } from "react-redux";
import { RootState } from "store";

const MainLayout: React.FC = ({ children }) => {
  const isNavCollapsed = useSelector(
    (store: RootState) => store.app.isNavCollapsed
  );

  return (
    <Fragment>
      <h1>Hello App</h1>
      {children}
    </Fragment>
  );
};

export default MainLayout;
