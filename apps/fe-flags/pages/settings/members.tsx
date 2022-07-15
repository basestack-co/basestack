import React from "react";
// Layout
import SettingsLayout from "layouts/Settings";
import Members from "templates/Settings/Members";

const MembersPage = () => {
  return <Members />;
};

MembersPage.Layout = SettingsLayout;

export default MembersPage;
