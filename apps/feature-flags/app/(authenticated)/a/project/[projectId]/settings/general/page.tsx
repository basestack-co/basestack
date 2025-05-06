"use client";

import React from "react";
// Router
import { useParams } from "next/navigation";
// Components
import ProjectName from "./_components/ProjectName";
import ProjectOwner from "./_components/ProjectOwner";
import DeleteProject from "./_components/DeleteProject";
import Endpoints from "./_components/Endpoints";
import Keys from "./_components/Keys";
import ProjectKey from "./_components/ProjectKey";
// Server
import { api } from "utils/trpc/react";
// Utils
import { config } from "@basestack/utils";
// Styles
import { CardList, CardListItem, SettingCardContainer } from "../styles";

const { hasFlagsPermission } = config.plans;

const GeneralPage = () => {
  const { projectId } = useParams<{ projectId: string }>();

  const { data: project } = api.project.byId.useQuery(
    { projectId },
    {
      enabled: !!projectId,
    }
  );

  return (
    <CardList>
      {hasFlagsPermission(project?.role, "edit_project_name") && (
        <CardListItem>
          <SettingCardContainer>
            <ProjectName role={project?.role} name={project?.name} />
          </SettingCardContainer>
        </CardListItem>
      )}
      <CardListItem>
        <SettingCardContainer>
          <ProjectOwner
            name={project?.owner?.name ?? ""}
            email={project?.owner?.email ?? ""}
            image={project?.owner?.image ?? ""}
          />
        </SettingCardContainer>
      </CardListItem>
      {hasFlagsPermission(project?.role, "view_project_keys") && (
        <>
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
        </>
      )}
      {hasFlagsPermission(project?.role, "delete_project") && (
        <CardListItem>
          <SettingCardContainer>
            <DeleteProject name={project?.name} />
          </SettingCardContainer>
        </CardListItem>
      )}
    </CardList>
  );
};

export default GeneralPage;
