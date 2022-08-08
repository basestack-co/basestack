import React from "react";
// Layout
import SettingsLayout from "layouts/Settings";
import ApiKeys from "templates/Settings/ApiKeys";

const ApiKeysPage = () => {
  return <ApiKeys />;
};

ApiKeysPage.Layout = SettingsLayout;

export default ApiKeysPage;
