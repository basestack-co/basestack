"use client";

import React from "react";
// Router
import { useParams } from "next/navigation";
// Components
import { CardList, CardListItem, SettingCardContainer } from "../styles";
import FormSuccessUrl from "./FormSuccessUrl";
import FormFailedUrl from "./FormFailedUrl";
import FormSendQueryString from "./FormSendQueryString";
import FormRedirectUrl from "./FormRedirectUrl";
// Utils
import { PlanTypeId } from "@basestack/utils";
// Server
import { api } from "utils/trpc/react";

const CustomizationSettingsPage = () => {
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
          <FormSendQueryString
            hasDataQueryString={form.data?.hasDataQueryString}
            planId={planId}
          />
        </SettingCardContainer>
      </CardListItem>
      <CardListItem>
        <SettingCardContainer>
          <FormRedirectUrl
            redirectUrl={form.data?.redirectUrl ?? ""}
            planId={planId}
          />
        </SettingCardContainer>
      </CardListItem>
      <CardListItem>
        <SettingCardContainer>
          <FormSuccessUrl
            successUrl={form.data?.successUrl ?? ""}
            planId={planId}
          />
        </SettingCardContainer>
      </CardListItem>
      <CardListItem>
        <SettingCardContainer>
          <FormFailedUrl errorUrl={form.data?.errorUrl ?? ""} planId={planId} />
        </SettingCardContainer>
      </CardListItem>
    </CardList>
  );
};

export default CustomizationSettingsPage;
