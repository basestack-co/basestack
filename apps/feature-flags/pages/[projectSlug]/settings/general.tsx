import React from "react";
// Layout
import SettingsLayout from "layouts/Settings";
// Components
import { CardList, CardListItem } from "components/ProjectSettings/styles";
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
        <ProjectName project={project} />
      </CardListItem>
      <CardListItem>
        <Endpoints project={project} />
      </CardListItem>
      <CardListItem>
        <ProjectKey projectKey={project.key} />
      </CardListItem>
      <CardListItem>
        <Keys project={project} />
      </CardListItem>
      {project.role === Role.ADMIN && (
        <CardListItem>
          <DeleteProject project={project} />
        </CardListItem>
      )}
    </CardList>
  );
};

GeneralPage.Layout = SettingsLayout;

export default GeneralPage;
