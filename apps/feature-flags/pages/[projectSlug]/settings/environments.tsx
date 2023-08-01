import React from "react";
// Layout
import SettingsLayout from "layouts/Settings";
// Components
import {
  CardList,
  CardListItem,
  SettingCardContainer,
} from "components/ProjectSettings/styles";
import Environments from "components/ProjectSettings/Environments";
// Types
import { ProjectSettings } from "types";

type Props = ProjectSettings;

const EnvironmentsPage = ({ project }: Props) => {
  return (
    <CardList>
      <CardListItem>
        <SettingCardContainer>
          <Environments project={project} />
        </SettingCardContainer>
      </CardListItem>
    </CardList>
  );
};

EnvironmentsPage.Layout = SettingsLayout;

export default EnvironmentsPage;
