"use client";

// Utils
import { config, PlanTypeId } from "@basestack/utils";
// Router
import { useParams } from "next/navigation";
// Server
import { api } from "utils/trpc/react";
// Components
import { CardList, CardListItem, SettingCardContainer } from "../styles";
import FlagsIpRules from "./_components/FlagsIpRules";
import FlagsWebsites from "./_components/FlagsWebsites";

const { hasFlagsPermission } = config.plans;

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
      {hasFlagsPermission(data?.role, "view_project_security") && (
        <>
          <CardListItem>
            <SettingCardContainer>
              <FlagsWebsites
                websites={data?.websites ?? ""}
                planId={PlanTypeId.USAGE}
              />
            </SettingCardContainer>
          </CardListItem>
          <CardListItem>
            <SettingCardContainer>
              <FlagsIpRules
                blockIpAddresses={data?.blockIpAddresses ?? ""}
                planId={PlanTypeId.USAGE}
              />
            </SettingCardContainer>
          </CardListItem>
        </>
      )}
    </CardList>
  );
};

export default SecuritySettingsPage;
