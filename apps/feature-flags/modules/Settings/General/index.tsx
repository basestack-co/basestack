import React from "react";
// Styles
import { CardList, CardListItem } from "../styles";
// Card Modules
import ProjectNameCard from "./ProjectNameCard";
import DeleteProjectCard from "./DeleteProjectCard";
// Types
import { ProjectSettings, ProjectRole } from "types";

type Props = ProjectSettings;

const GeneralModule = ({ project }: Props) => {
  console.log("the project ", project);
  return (
    <CardList>
      <CardListItem>
        <ProjectNameCard project={project} />
      </CardListItem>

      {project?.role === "ADMIN" && (
        <CardListItem>
          <DeleteProjectCard project={project} />
        </CardListItem>
      )}
    </CardList>
  );
};

export default GeneralModule;
