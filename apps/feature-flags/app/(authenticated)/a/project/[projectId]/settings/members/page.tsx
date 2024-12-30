"use client";

import React from "react";
// Router
import { useParams } from "next/navigation";
// Modules
import {
  CardList,
  CardListItem,
  SettingCardContainer,
} from "components/ProjectSettings/styles";
import Invite from "components/ProjectSettings/Invite";
// Server
import { api } from "utils/trpc/react";

const MembersPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { data: project } = api.project.byId.useQuery(
    { projectId },
    {
      enabled: !!projectId,
    },
  );

  return (
    <CardList>
      <CardListItem>
        <SettingCardContainer>
          <Invite role={project?.role} />
        </SettingCardContainer>
      </CardListItem>
    </CardList>
  );
};

export default MembersPage;
