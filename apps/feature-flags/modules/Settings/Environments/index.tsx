import React from "react";
// Styles
import { CardList, CardListItem } from "../styles";
// Card Modules
import EnvironmentsCard from "./EnvironmentsCard";
// Types
import { ProjectSettings } from "types";

type Props = ProjectSettings;
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
