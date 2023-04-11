import React from "react";
// Libs
import { RouterOutput } from "libs/trpc";
// Styles
import { CardList, CardListItem } from "../styles";
// Modules
import Endpoints from "./Endpoints";
import Keys from "./Keys";

interface Props {
  project: RouterOutput["project"]["bySlug"]["project"];
}

const ApiKeysModule = ({ project }: Props) => {
  return (
    <CardList>
      <CardListItem>
        <Endpoints project={project} />
      </CardListItem>
      <CardListItem>
        <Keys project={project} />
      </CardListItem>
    </CardList>
  );
};

export default ApiKeysModule;
