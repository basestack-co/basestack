import React, { Fragment } from "react";
// Store
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";

const MainLayout: React.FC = ({ children }) => {
  const isNavCollapsed = useSelector(
    (store: RootState) => store.app.isNavCollapsed
  );

  console.log("isNavCollapsed = ", isNavCollapsed);

  return (
    <Fragment>
      <h1>Hello App</h1>
      {children}
    </Fragment>
  );
};

export default MainLayout;
