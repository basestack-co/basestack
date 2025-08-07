"use client";

// Utils
import { config } from "@basestack/utils";
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
    },
  );

  const permissions = useMemo(
    () => ({
      canUpdate: hasPermission(data?.role, PERMISSIONS.FORM.GENERAL.UPDATE),
    }),
    [data?.role],
  );

  if (!permissions.canUpdate) {
    return null;
  }

  return (
    <CardList>
      <CardListItem>
        <SettingCardContainer>
          <FormSendQueryString hasDataQueryString={data?.hasDataQueryString} />
        </SettingCardContainer>
      </CardListItem>
      <CardListItem>
        <SettingCardContainer>
          <FormRedirectUrl redirectUrl={data?.redirectUrl ?? ""} />
        </SettingCardContainer>
      </CardListItem>
      <CardListItem>
        <SettingCardContainer>
          <FormSuccessUrl successUrl={data?.successUrl ?? ""} />
        </SettingCardContainer>
      </CardListItem>
      <CardListItem>
        <SettingCardContainer>
          <FormFailedUrl errorUrl={data?.errorUrl ?? ""} />
        </SettingCardContainer>
      </CardListItem>
    </CardList>
  );
};

export default CustomizationSettingsPage;
