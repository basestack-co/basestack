"use client";

// Router
import { useParams } from "next/navigation";
// Locales
import { useTranslations } from "next-intl";

// Styles
import { useTheme } from "styled-components";
// Server
import { api } from "utils/trpc/react";

const ProjectMonitorsPage = () => {
  const t = useTranslations();
  const theme = useTheme();

  const { projectId } = useParams<{ projectId: string }>();

  const { data: project } = api.projects.byId.useQuery(
    { projectId },
    {
      enabled: !!projectId,
    },
  );

  return <div>the monitors page for {project?.name}</div>;
};

export default ProjectMonitorsPage;
