import React from "react";
// Router
import { useRouter } from "next/router";
// Layout
import SettingsLayout from "layouts/Settings";
// Components
import {
  CardList,
  CardListItem,
  SettingCardContainer,
} from "components/ProjectSettings/styles";
import ProjectName from "components/ProjectSettings/ProjectName";
import DeleteProject from "components/ProjectSettings/DeleteProject";
import Endpoints from "components/ProjectSettings/Endpoints";
import Keys from "components/ProjectSettings/Keys";
import ProjectKey from "components/ProjectSettings/ProjectKey";
// Server
import { trpc } from "libs/trpc";
// Types
import { Role } from "@prisma/client";

const GeneralPage = () => {
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
          <ProjectName role={project?.role} name={project?.name} />
        </SettingCardContainer>
      </CardListItem>
      <CardListItem>
        <SettingCardContainer>
          <Endpoints />
        </SettingCardContainer>
      </CardListItem>
      <CardListItem>
        <SettingCardContainer>
          <ProjectKey projectKey={project?.key ?? ""} />
        </SettingCardContainer>
      </CardListItem>
      <CardListItem>
        <SettingCardContainer>
          <Keys />
        </SettingCardContainer>
      </CardListItem>
      {project?.role === Role.ADMIN && (
        <CardListItem>
          <SettingCardContainer>
            <DeleteProject name={project?.name} />
          </SettingCardContainer>
        </CardListItem>
      )}
    </CardList>
  );
};

GeneralPage.Layout = SettingsLayout;

export default GeneralPage;
