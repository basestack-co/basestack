import React from "react";
// Styles
import { CardList, CardListItem } from "../styles";
// Libs
import { RouterOutput } from "libs/trpc";
// Card Modules
import ProjectNameCard from "./ProjectNameCard";
import DeleteProjectCard from "./DeleteProjectCard";

interface Props {
  project: RouterOutput["project"]["bySlug"]["project"];
}

const GeneralModule = ({ project }: Props) => {
  return (
    <CardList>
      <CardListItem>
        <ProjectNameCard project={project} />
      </CardListItem>
      <CardListItem>
        <DeleteProjectCard project={project} />
      </CardListItem>
    </CardList>
  );
};

export default GeneralModule;
