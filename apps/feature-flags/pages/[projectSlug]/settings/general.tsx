import React from "react";
// Layout
import SettingsLayout from "layouts/Settings";
// Modules
import { CardList, CardListItem } from "modules/Settings/styles";
import ProjectName from "modules/Settings/Cards/ProjectName";
import DeleteProject from "modules/Settings/Cards/DeleteProject";
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
