import React from "react";
// Layout
import SettingsLayout from "layouts/Settings";
// Modules
import { CardList, CardListItem } from "modules/Settings/styles";
import Environments from "modules/Settings/Cards/Environments";
// Types
import { ProjectSettings } from "types";

type Props = ProjectSettings;

const EnvironmentsPage = ({ project }: Props) => {
  return (
    <CardList>
      <CardListItem>
        <Environments project={project} />
      </CardListItem>
    </CardList>
  );
};

EnvironmentsPage.Layout = SettingsLayout;

export default EnvironmentsPage;
