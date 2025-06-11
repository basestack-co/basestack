"use client";

import React from "react";
// Router
import { useParams } from "next/navigation";
// Modules
import MembersTableCard from "./_components/MembersTable";
// Server
import { api } from "utils/trpc/react";
// Styles
import { CardList, CardListItem, SettingCardContainer } from "../styles";

const MembersPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { data: project } = api.projects.byId.useQuery(
    { projectId },
    {
      enabled: !!projectId,
    },
  );

  return (
    <CardList>
      <CardListItem>
        <SettingCardContainer>
          <MembersTableCard role={project?.role} />
        </SettingCardContainer>
      </CardListItem>
    </CardList>
  );
};

export default MembersPage;
