"use client";

// Utils
import { config } from "@basestack/utils";
// Router
import { useParams } from "next/navigation";
// Server
import { api } from "utils/trpc/react";
// Components
import { CardList, CardListItem, SettingCardContainer } from "../styles";
import FlagsIpRules from "./_components/FlagsIpRules";
import FlagsWebsites from "./_components/FlagsWebsites";

const { hasPermission, PERMISSIONS } = config;

const SecuritySettingsPage = () => {
  const { projectId } = useParams<{ projectId: string }>();

  const { data } = api.projects.byId.useQuery(
    { projectId },
    {
      enabled: !!projectId,
    },
  );

  return (
    <CardList>
      {hasPermission(data?.role, PERMISSIONS.PROJECT.SETTINGS.VIEW) && (
        <>
          <CardListItem>
            <SettingCardContainer>
              <FlagsWebsites websites={data?.websites ?? ""} />
            </SettingCardContainer>
          </CardListItem>
          <CardListItem>
            <SettingCardContainer>
              <FlagsIpRules blockIpAddresses={data?.blockIpAddresses ?? ""} />
            </SettingCardContainer>
          </CardListItem>
        </>
      )}
    </CardList>
  );
};

export default SecuritySettingsPage;
