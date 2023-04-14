import React from "react";
// Layout
import SettingsLayout from "layouts/Settings";
// Modules
import { CardList, CardListItem } from "modules/Settings/styles";
import Endpoints from "modules/Settings/Cards/Endpoints";
import Keys from "modules/Settings/Cards/Keys";
// Types
import { ProjectSettings } from "types";

type Props = ProjectSettings;
const ApiKeysPage = ({ project }: Props) => {
  return (
    <CardList>
      <CardListItem>
        <Endpoints project={project} />
      </CardListItem>
      <CardListItem>
        <Keys project={project} />
      </CardListItem>
    </CardList>
  );
};

ApiKeysPage.Layout = SettingsLayout;

export default ApiKeysPage;
