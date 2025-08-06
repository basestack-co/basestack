"use client";

// Utils
import { config, PlanTypeId } from "@basestack/utils";
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

  return (
    <CardList>
      {permissions.canView && (
        <CardListItem>
          <SettingCardContainer>
            <FormWebsites
              websites={data?.websites ?? ""}
              planId={PlanTypeId.USAGE}
            />
          </SettingCardContainer>
        </CardListItem>
      )}
      {permissions.canView && (
        <CardListItem>
          <SettingCardContainer>
            <FormIpRules
              blockIpAddresses={data?.blockIpAddresses ?? ""}
              planId={PlanTypeId.USAGE}
            />
          </SettingCardContainer>
        </CardListItem>
      )}
      {permissions.canView && (
        <CardListItem>
          <SettingCardContainer>
            <FormHoneyPot honeypot={data?.honeypot ?? ""} />
          </SettingCardContainer>
        </CardListItem>
      )}
    </CardList>
  );
};

export default SecuritySettingsPage;
