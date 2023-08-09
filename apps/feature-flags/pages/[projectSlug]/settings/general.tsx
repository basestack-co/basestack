import React from "react";
// Layout
import SettingsLayout from "layouts/Settings";
// Components
import {
  CardList,
  CardListItem,
  SettingCardContainer,
} from "components/ProjectSettings/styles";
import ProjectName from "components/ProjectSettings/ProjectName";
import DeleteProject from "components/ProjectSettings/DeleteProject";
import Endpoints from "components/ProjectSettings/Endpoints";
import Keys from "components/ProjectSettings/Keys";
import ProjectKey from "components/ProjectSettings/ProjectKey";
// Types
import { ProjectSettings } from "types";
import { Role } from "@prisma/client";

type Props = ProjectSettings;

const GeneralPage = ({ project }: Props) => {
  return (
    <CardList>
      <CardListItem>
        <SettingCardContainer>
          <ProjectName project={project} />
        </SettingCardContainer>
      </CardListItem>
      <CardListItem>
        <SettingCardContainer>
          <Endpoints />
        </SettingCardContainer>
      </CardListItem>
      <CardListItem>
        <SettingCardContainer>
          <ProjectKey projectKey={project.key} />
        </SettingCardContainer>
      </CardListItem>
      <CardListItem>
        <SettingCardContainer>
          <Keys project={project} />
        </SettingCardContainer>
      </CardListItem>
      {project.role === Role.ADMIN && (
        <CardListItem>
          <SettingCardContainer>
            <DeleteProject project={project} />
          </SettingCardContainer>
        </CardListItem>
      )}
    </CardList>
  );
};

GeneralPage.Layout = SettingsLayout;

export default GeneralPage;
