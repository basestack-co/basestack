import React from "react";
// Styles
import { CardList, CardListItem } from "../styles";
// Libs
import { RouterOutput } from "libs/trpc";
// Modules
import ProjectName from "./ProjectName";
import DeleteProject from "./DeleteProject";

interface Props {
  project: RouterOutput["project"]["bySlug"]["project"];
}

const GeneralModule = ({ project }: Props) => {
  return (
    <CardList>
      <CardListItem>
        <ProjectName project={project} />
      </CardListItem>
      <CardListItem>
        <DeleteProject project={project} />
      </CardListItem>
    </CardList>
  );
};

export default GeneralModule;
