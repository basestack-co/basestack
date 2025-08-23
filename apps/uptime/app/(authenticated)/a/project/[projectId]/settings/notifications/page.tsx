"use client";

// Utils
import { config } from "@basestack/utils";
// Router
import { useParams } from "next/navigation";
// React
import { useMemo } from "react";
// Server
import { api } from "utils/trpc/react";
// Components
import { CardList, CardListItem, SettingCardContainer } from "../styles";
import ProjectEmails from "./_components/ProjectEmails";

const { hasPermission, PERMISSIONS } = config;

const NotificationsSettingsPage = () => {
  const { projectId } = useParams<{ projectId: string }>();

  const { data } = api.projects.byId.useQuery(
    { projectId },
    {
      enabled: !!projectId,
    }
  );

  const permissions = useMemo(
    () => ({
      canView: hasPermission(data?.role, PERMISSIONS.PROJECT.SETTINGS.VIEW),
    }),
    [data?.role]
  );

  return (
    <CardList>
      {permissions.canView && (
        <CardListItem>
          <SettingCardContainer>
            <ProjectEmails emails={data?.emails ?? ""} />
          </SettingCardContainer>
        </CardListItem>
      )}
    </CardList>
  );
};

export default NotificationsSettingsPage;
