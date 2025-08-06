"use client";

// Utils
import { config } from "@basestack/utils";
// Router
import { useParams } from "next/navigation";
// Server
import { api } from "utils/trpc/react";
// Components
import { CardList, CardListItem, SettingCardContainer } from "../styles";
import FormHoneyPot from "./_components/FormHoneyPot";
import FormIpRules from "./_components/FormIpRules";
import FormWebsites from "./_components/FormWebsites";
// React
import { useMemo } from "react";

const { hasPermission, PERMISSIONS } = config;

const SecuritySettingsPage = () => {
  const { formId } = useParams<{ formId: string }>();

  const { data } = api.forms.byId.useQuery(
    { formId },
    {
      enabled: !!formId,
    }
  );

  const permissions = useMemo(
    () => ({
      canView: hasPermission(data?.role, PERMISSIONS.FORM.SETTINGS.VIEW),
    }),
    [data?.role]
  );

  if (!permissions.canView) {
    return null;
  }

  return (
    <CardList>
      <CardListItem>
        <SettingCardContainer>
          <FormWebsites websites={data?.websites ?? ""} />
        </SettingCardContainer>
      </CardListItem>
      <CardListItem>
        <SettingCardContainer>
          <FormIpRules blockIpAddresses={data?.blockIpAddresses ?? ""} />
        </SettingCardContainer>
      </CardListItem>
      <CardListItem>
        <SettingCardContainer>
          <FormHoneyPot honeypot={data?.honeypot ?? ""} />
        </SettingCardContainer>
      </CardListItem>
    </CardList>
  );
};

export default SecuritySettingsPage;
