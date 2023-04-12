import React from "react";
// Server
import { RouterOutput } from "libs/trpc";
// Styles
import { CardList, CardListItem } from "../styles";
// Cards Modules
import EnvironmentsCard from "./EnvironmentsCard";

export const headers = ["Environment", "Slug", "Description", "Created At"];

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
