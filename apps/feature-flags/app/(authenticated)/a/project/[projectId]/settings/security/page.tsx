"use client";

import React, { useMemo } from "react";
// Router
import { useParams, useRouter } from "next/navigation";
// Components
import { CardList, CardListItem, SettingCardContainer } from "../styles";
import FlagsIpRules from "./_components/FlagsIpRules";
import FlagsWebsites from "./_components/FlagsWebsites";
// Utils
import { PlanTypeId, config } from "@basestack/utils";
// Server
import { api } from "utils/trpc/react";

const { hasFlagsPermission } = config.plans;

const SecuritySettingsPage = () => {
  const router = useRouter();
  const { projectId } = useParams<{ projectId: string }>();

  const { data } = api.project.byId.useQuery(
    { projectId },
    {
      enabled: !!projectId,
    },
  );

  const planId = useMemo(() => {
    return (data?.owner?.subscription?.planId ?? PlanTypeId.FREE) as PlanTypeId;
  }, [data]);

  return (
    <CardList>
      {hasFlagsPermission(data?.role, "view_project_security") && (
        <>
          <CardListItem>
            <SettingCardContainer>
              <FlagsWebsites websites={data?.websites ?? ""} planId={planId} />
            </SettingCardContainer>
          </CardListItem>
          <CardListItem>
            <SettingCardContainer>
              <FlagsIpRules
                blockIpAddresses={data?.blockIpAddresses ?? ""}
                planId={planId}
              />
            </SettingCardContainer>
          </CardListItem>
        </>
      )}
    </CardList>
  );
};

export default SecuritySettingsPage;
