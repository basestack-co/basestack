"use client";

// Utils
import { config } from "@basestack/utils";
// Router
import { useParams, useRouter } from "next/navigation";
// React
import { useEffect, useMemo } from "react";
// Server
import { api } from "utils/trpc/react";
// Styles
import { CardList, CardListItem, SettingCardContainer } from "../styles";
// Components
import Environments from "./_components/Environments";

const { hasPermission, PERMISSIONS } = config;

const EnvironmentsPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const router = useRouter();

  const { data: project } = api.projects.byId.useQuery(
    { projectId },
    {
      enabled: !!projectId,
    },
  );

  const permissions = useMemo(
    () => ({
      canView: hasPermission(
        project?.role,
        PERMISSIONS.PROJECT.ENVIRONMENTS.VIEW,
      ),
    }),
    [project?.role],
  );

  useEffect(() => {
    if (!permissions.canView) {
      router.push(`/a/project/${projectId}/settings/general`);
    }
  }, [projectId, router, permissions.canView]);

  return (
    <CardList>
      {permissions.canView && (
        <CardListItem>
          <SettingCardContainer>
            <Environments role={project?.role} />
          </SettingCardContainer>
        </CardListItem>
      )}
    </CardList>
  );
};

export default EnvironmentsPage;
