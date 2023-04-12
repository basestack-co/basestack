import React from "react";
// Libs
import { RouterOutput } from "libs/trpc";
// Styles
import { CardList, CardListItem } from "../styles";
// Card Modules
import InviteCard from "./InviteCard";

export const headers = ["Name", "Email", "Role"];

interface Props {
  project: RouterOutput["project"]["bySlug"]["project"];
}

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
