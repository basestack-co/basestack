"use client";

import React from "react";
// Router
import { useParams } from "next/navigation";
// Components
import { CardList, CardListItem, SettingCardContainer } from "../styles";
import FormIpRules from "./_components/FormIpRules";
import FormHoneyPot from "./_components/FormHoneyPot";
import FormWebsites from "./_components/FormWebsites";
// Utils
import { PlanTypeId } from "@basestack/utils";
// Server
import { api } from "utils/trpc/react";

const SecuritySettingsPage = () => {
  const { formId } = useParams<{ formId: string }>();

  const [form, usage] = api.useQueries((t) => [
    t.form.byId({ formId }, { enabled: !!formId }),
    t.subscription.usage(undefined, { enabled: !!formId }),
  ]);

  const planId = (usage.data?.planId ?? PlanTypeId.FREE) as PlanTypeId;

  return (
    <CardList>
      <CardListItem>
        <SettingCardContainer>
          <FormWebsites websites={form.data?.websites ?? ""} planId={planId} />
        </SettingCardContainer>
      </CardListItem>
      <CardListItem>
        <SettingCardContainer>
          <FormIpRules
            blockIpAddresses={form.data?.blockIpAddresses ?? ""}
            planId={planId}
          />
        </SettingCardContainer>
      </CardListItem>
      <CardListItem>
        <SettingCardContainer>
          <FormHoneyPot honeypot={form.data?.honeypot ?? ""} />
        </SettingCardContainer>
      </CardListItem>
    </CardList>
  );
};

export default SecuritySettingsPage;
