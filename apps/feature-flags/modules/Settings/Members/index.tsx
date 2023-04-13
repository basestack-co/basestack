import React from "react";
// Styles
import { CardList, CardListItem } from "../styles";
// Card Modules
import InviteCard from "./InviteCard";
// Types
import { ProjectSettings } from "types";

type Props = ProjectSettings;

const MembersModule = ({ project }: Props) => {
  return (
    <CardList>
      <CardListItem>
        <InviteCard project={project} />
      </CardListItem>
    </CardList>
  );
};

export default MembersModule;
