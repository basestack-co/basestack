"use client";

import React from "react";
// Router
import { useParams } from "next/navigation";
// Components
import { CardList, CardListItem, SettingCardContainer } from "../styles";
import FormSuccessUrl from "./_components/FormSuccessUrl";
import FormFailedUrl from "./_components/FormFailedUrl";
import FormSendQueryString from "./_components/FormSendQueryString";
import FormRedirectUrl from "./_components/FormRedirectUrl";
// Utils
import { PlanTypeId, config } from "@basestack/utils";
// Server
import { api } from "utils/trpc/react";

const { hasFormsPermission } = config.plans;

const CustomizationSettingsPage = () => {
  const { formId } = useParams<{ formId: string }>();

  const { data } = api.forms.byId.useQuery(
    { formId },
    {
      enabled: !!formId,
    },
  );

  return (
    <CardList>
      {hasFormsPermission(
        data?.role,
        "edit_form_customization_data_query_string",
      ) && (
        <CardListItem>
          <SettingCardContainer>
            <FormSendQueryString
              hasDataQueryString={data?.hasDataQueryString}
              planId={PlanTypeId.USAGE}
            />
          </SettingCardContainer>
        </CardListItem>
      )}
      {hasFormsPermission(
        data?.role,
        "edit_form_customization_redirect_url",
      ) && (
        <CardListItem>
          <SettingCardContainer>
            <FormRedirectUrl
              redirectUrl={data?.redirectUrl ?? ""}
              planId={PlanTypeId.USAGE}
            />
          </SettingCardContainer>
        </CardListItem>
      )}
      {hasFormsPermission(
        data?.role,
        "edit_form_customization_success_url",
      ) && (
        <CardListItem>
          <SettingCardContainer>
            <FormSuccessUrl
              successUrl={data?.successUrl ?? ""}
              planId={PlanTypeId.USAGE}
            />
          </SettingCardContainer>
        </CardListItem>
      )}
      {hasFormsPermission(data?.role, "edit_form_customization_error_url") && (
        <CardListItem>
          <SettingCardContainer>
            <FormFailedUrl
              errorUrl={data?.errorUrl ?? ""}
              planId={PlanTypeId.USAGE}
            />
          </SettingCardContainer>
        </CardListItem>
      )}
    </CardList>
  );
};

export default CustomizationSettingsPage;
