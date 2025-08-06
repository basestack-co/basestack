"use client";

// Utils
import { config } from "@basestack/utils";
// Router
import { useParams } from "next/navigation";
// Server
import { api } from "utils/trpc/react";
// Styles
import { CardList, CardListItem, SettingCardContainer } from "../styles";
import DeleteProject from "./_components/DeleteProject";
import Endpoints from "./_components/Endpoints";
import Keys from "./_components/Keys";
import ProjectKey from "./_components/ProjectKey";
// Components
import ProjectName from "./_components/ProjectName";
import ProjectOwner from "./_components/ProjectOwner";
// React
import { useMemo } from "react";

const { hasPermission, PERMISSIONS } = config;

const GeneralPage = () => {
  const { projectId } = useParams<{ projectId: string }>();

  const { data: project } = api.projects.byId.useQuery(
    { projectId },
    {
      enabled: !!projectId,
    }
  );

  const permissions = useMemo(
    () => ({
      canUpdate: hasPermission(
        project?.role,
        PERMISSIONS.PROJECT.GENERAL.UPDATE
      ),
      canDelete: hasPermission(
        project?.role,
        PERMISSIONS.PROJECT.GENERAL.DELETE
      ),
      canViewKeys: hasPermission(project?.role, PERMISSIONS.PROJECT.KEYS.VIEW),
    }),
    [project?.role]
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
      {permissions.canViewKeys && (
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
