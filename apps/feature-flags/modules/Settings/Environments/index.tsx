import React from "react";
// Server
import { trpc, RouterOutput } from "libs/trpc";
// Styles
import { CardList, CardListItem } from "../styles";
// Card Modules
import EnvironmentsCard from "./EnvironmentsCard";

export interface Props {
  project: RouterOutput["project"]["bySlug"]["project"];
}

const EnvironmentsModule = ({ project }: Props) => {
  return (
    <CardList>
      <CardListItem>
        <EnvironmentsCard project={project} />
      </CardListItem>
    </CardList>
  );
};

export default EnvironmentsModule;
