"use client";

// Utils
import { config, PlanTypeId } from "@basestack/utils";
// Router
import { useParams } from "next/navigation";
// Server
import { api } from "utils/trpc/react";
// Components
import { CardList, CardListItem, SettingCardContainer } from "../styles";
import FormFailedUrl from "./_components/FormFailedUrl";
import FormRedirectUrl from "./_components/FormRedirectUrl";
import FormSendQueryString from "./_components/FormSendQueryString";
import FormSuccessUrl from "./_components/FormSuccessUrl";
// React
import { useMemo } from "react";

const { hasPermission, PERMISSIONS } = config;

const CustomizationSettingsPage = () => {
  const { formId } = useParams<{ formId: string }>();

  const { data } = api.forms.byId.useQuery(
    { formId },
    {
      enabled: !!formId,
    }
  );

  const permissions = useMemo(
    () => ({
      canUpdate: hasPermission(data?.role, PERMISSIONS.FORM.GENERAL.UPDATE),
    }),
    [data?.role]
  );

  return (
    <CardList>
      {permissions.canUpdate && (
        <CardListItem>
          <SettingCardContainer>
            <FormSendQueryString
              hasDataQueryString={data?.hasDataQueryString}
              planId={PlanTypeId.USAGE}
            />
          </SettingCardContainer>
        </CardListItem>
      )}
      {permissions.canUpdate && (
        <CardListItem>
          <SettingCardContainer>
            <FormRedirectUrl
              redirectUrl={data?.redirectUrl ?? ""}
              planId={PlanTypeId.USAGE}
            />
          </SettingCardContainer>
        </CardListItem>
      )}
      {permissions.canUpdate && (
        <CardListItem>
          <SettingCardContainer>
            <FormSuccessUrl
              successUrl={data?.successUrl ?? ""}
              planId={PlanTypeId.USAGE}
            />
          </SettingCardContainer>
        </CardListItem>
      )}
      {permissions.canUpdate && (
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
