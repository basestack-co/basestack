import React from "react";
// Layout
import SettingsLayout from "layouts/Settings";
// Modules
import {
  CardList,
  CardListItem,
  SettingCardContainer,
} from "components/ProjectSettings/styles";
import Invite from "components/ProjectSettings/Invite";
// Types
import { ProjectSettings } from "types";

type Props = ProjectSettings;

const MembersPage = ({ project }: Props) => {
  return (
    <CardList>
      <CardListItem>
        <SettingCardContainer>
          <Invite project={project} />
        </SettingCardContainer>
      </CardListItem>
    </CardList>
  );
};

MembersPage.Layout = SettingsLayout;

export default MembersPage;
