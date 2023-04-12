import React from "react";
// Libs
import { RouterOutput } from "libs/trpc";
// Styles
import { CardList, CardListItem } from "../styles";
// Cards Modules
import EndpointsCard from "./EndpointsCard";
import KeysCard from "./KeysCard";

interface Props {
  project: RouterOutput["project"]["bySlug"]["project"];
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
