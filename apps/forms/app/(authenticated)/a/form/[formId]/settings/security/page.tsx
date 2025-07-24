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
import FormHoneyPot from "./_components/FormHoneyPot";
import FormIpRules from "./_components/FormIpRules";
import FormWebsites from "./_components/FormWebsites";

const { hasFormsPermission } = config.plans;

const SecuritySettingsPage = () => {
  const { formId } = useParams<{ formId: string }>();

  const { data } = api.forms.byId.useQuery(
    { formId },
    {
      enabled: !!formId,
    },
  );

  return (
    <CardList>
      {hasFormsPermission(data?.role, "edit_form_security_websites") && (
        <CardListItem>
          <SettingCardContainer>
            <FormWebsites
              websites={data?.websites ?? ""}
              planId={PlanTypeId.USAGE}
            />
          </SettingCardContainer>
        </CardListItem>
      )}
      {hasFormsPermission(data?.role, "edit_form_security_ip_rules") && (
        <CardListItem>
          <SettingCardContainer>
            <FormIpRules
              blockIpAddresses={data?.blockIpAddresses ?? ""}
              planId={PlanTypeId.USAGE}
            />
          </SettingCardContainer>
        </CardListItem>
      )}
      {hasFormsPermission(data?.role, "edit_form_security_honey_pot") && (
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
