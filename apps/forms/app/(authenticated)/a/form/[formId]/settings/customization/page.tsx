"use client";

// Utils
import { config, PlanTypeId } from "@basestack/utils";
// Router
import { useParams } from "next/navigation";
import React from "react";
// Server
import { api } from "utils/trpc/react";
// Components
import { CardList, CardListItem, SettingCardContainer } from "../styles";
import FormFailedUrl from "./_components/FormFailedUrl";
import FormRedirectUrl from "./_components/FormRedirectUrl";
import FormSendQueryString from "./_components/FormSendQueryString";
import FormSuccessUrl from "./_components/FormSuccessUrl";

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
