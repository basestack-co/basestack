"use client";

// Utils
import { config } from "@basestack/utils";
// Router
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
// Server
import { api } from "utils/trpc/react";
// Styles
import { CardList, CardListItem, SettingCardContainer } from "../styles";
// Components
import Environments from "./_components/Environments";

const { hasFlagsPermission } = config.plans;

const EnvironmentsPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const router = useRouter();

  const { data: project } = api.projects.byId.useQuery(
    { projectId },
    {
      enabled: !!projectId,
    },
  );

  useEffect(() => {
    if (!hasFlagsPermission(project?.role, "view_project_environments")) {
      router.push(`/a/project/${projectId}/settings/general`);
    }
  }, [project?.role, projectId, router]);

  return (
    <CardList>
      {hasFlagsPermission(project?.role, "view_project_environments") && (
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
