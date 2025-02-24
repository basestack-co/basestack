"use client";

import React from "react";
// Router
import { useParams } from "next/navigation";
// Components
import { CardList, CardListItem, SettingCardContainer } from "../styles";
import FlagsIpRules from "./_components/FlagsIpRules";
import FlagsWebsites from "./_components/FlagsWebsites";
// Utils
import { PlanTypeId } from "@basestack/utils";
// Server
import { api } from "utils/trpc/react";

const SecuritySettingsPage = () => {
  const { projectId } = useParams<{ projectId: string }>();

  const [project, usage] = api.useQueries((t) => [
    t.project.byId({ projectId }, { enabled: !!projectId }),
    t.subscription.usage(undefined, { enabled: !!projectId }),
  ]);

  const planId = (usage.data?.planId ?? PlanTypeId.FREE) as PlanTypeId;

  return (
    <CardList>
      <CardListItem>
        <SettingCardContainer>
          <FlagsWebsites
            websites={project.data?.websites ?? ""}
            planId={planId}
          />
        </SettingCardContainer>
      </CardListItem>
      <CardListItem>
        <SettingCardContainer>
          <FlagsIpRules
            blockIpAddresses={project.data?.blockIpAddresses ?? ""}
            planId={planId}
          />
        </SettingCardContainer>
      </CardListItem>
    </CardList>
  );
};

export default SecuritySettingsPage;
