import React from "react";
// Layout
import SettingsLayout from "layouts/Settings";
import Environments from "templates/Settings/Environments";

const EnvironmentsPage = () => {
  return <Environments />;
};

EnvironmentsPage.Layout = SettingsLayout;

export default EnvironmentsPage;
