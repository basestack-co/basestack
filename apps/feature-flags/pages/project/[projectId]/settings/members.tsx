import React from "react";
// Router
import { useRouter } from "next/router";
// Layout
import SettingsLayout from "layouts/Settings";
// Modules
import {
  CardList,
  CardListItem,
  SettingCardContainer,
} from "components/ProjectSettings/styles";
import Invite from "components/ProjectSettings/Invite";
// Server
import { trpc } from "libs/trpc";

const MembersPage = () => {
  const router = useRouter();
  const { projectId } = router.query as { projectId: string };
  const { data: project, isLoading } = trpc.project.byId.useQuery(
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

MembersPage.Layout = SettingsLayout;

export default MembersPage;
