import React from "react";
// Styles
import { CardList, CardListItem } from "../styles";
// Libs
import { inferQueryOutput } from "libs/trpc";
// Modules
import ProjectName from "./ProjectName";

interface Props {
  project: inferQueryOutput<"project.bySlug">["project"];
}

const GeneralModule = ({ project }: Props) => {
  return (
    <CardList>
      <CardListItem>
        <ProjectName project={project} />
      </CardListItem>
    </CardList>
  );
};

export default GeneralModule;
