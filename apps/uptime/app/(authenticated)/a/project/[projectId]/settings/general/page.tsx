"use client";

// React
import { useMemo } from "react";
// Utils
import { config } from "@basestack/utils";
// Router
import { useParams } from "next/navigation";
// Server
import { api } from "utils/trpc/react";
// Styles
import { CardList, CardListItem, SettingCardContainer } from "../styles";
// Components
import DeleteProject from "./_components/DeleteProject";
import ProjectName from "./_components/ProjectName";
import ProjectOwner from "./_components/ProjectOwner";

const { hasPermission, PERMISSIONS } = config;

const GeneralPage = () => {
  const { projectId } = useParams<{ projectId: string }>();

  const { data: project } = api.projects.byId.useQuery(
    { projectId },
    {
      enabled: !!projectId,
    },
  );

  const permissions = useMemo(
    () => ({
      canUpdate: hasPermission(
        project?.role,
        PERMISSIONS.PROJECT.GENERAL.UPDATE,
      ),
      canDelete: hasPermission(
        project?.role,
        PERMISSIONS.PROJECT.GENERAL.DELETE,
      ),
    }),
    [project?.role],
  );

  return (
    <CardList>
      {permissions.canUpdate && (
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
      {permissions.canDelete && (
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
