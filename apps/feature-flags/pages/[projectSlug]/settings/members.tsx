import React from "react";
// Layout
import SettingsLayout from "layouts/Settings";
// Modules
import { CardList, CardListItem } from "modules/Settings/styles";
import Invite from "modules/Settings/Cards/Invite";
// Types
import { ProjectSettings } from "types";

type Props = ProjectSettings;

const MembersPage = ({ project }: Props) => {
  return (
    <CardList>
      <CardListItem>
        <Invite project={project} />
      </CardListItem>
    </CardList>
  );
};

MembersPage.Layout = SettingsLayout;

export default MembersPage;
