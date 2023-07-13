import React from "react";
// Layout
import SettingsLayout from "layouts/Settings";
// Modules
import { CardList, CardListItem } from "modules/Settings/styles";
import ProjectName from "modules/Settings/Cards/ProjectName";
import DeleteProject from "modules/Settings/Cards/DeleteProject";
import Endpoints from "modules/Settings/Cards/Endpoints";
import Keys from "modules/Settings/Cards/Keys";
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
