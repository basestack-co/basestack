import React from "react";
// Layout
import SettingsLayout from "layouts/Settings";
// Components
import { CardList, CardListItem } from "components/ProjectSettings/styles";
import Environments from "components/ProjectSettings/Environments";
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
