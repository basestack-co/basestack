"use client";

import React, { useEffect } from "react";
// Router
import { useParams, useRouter } from "next/navigation";
// Modules
import Invite from "./_components/Invite";
// Server
import { api } from "utils/trpc/react";
// Styles
import { CardList, CardListItem, SettingCardContainer } from "../styles";

const MembersPage = () => {
  const router = useRouter();
  const { projectId } = useParams<{ projectId: string }>();
  const { data: project } = api.project.byId.useQuery(
    { projectId },
    {
      enabled: !!projectId,
    },
  );

  useEffect(() => {
    router.back();
  }, [router]);

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
