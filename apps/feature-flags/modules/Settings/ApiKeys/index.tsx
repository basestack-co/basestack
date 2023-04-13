import React from "react";
// Styles
import { CardList, CardListItem } from "../styles";
// Cards Modules
import EndpointsCard from "./EndpointsCard";
import KeysCard from "./KeysCard";
// Libs
import { Project } from "types";

interface Props {
  project: Project;
}

const ApiKeysModule = ({ project }: Props) => {
  return (
    <CardList>
      <CardListItem>
        <EndpointsCard project={project} />
      </CardListItem>
      <CardListItem>
        <KeysCard project={project} />
      </CardListItem>
    </CardList>
  );
};

export default ApiKeysModule;
