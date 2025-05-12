"use client";

import React, { useMemo } from "react";
// Router
import { useParams } from "next/navigation";
// Components
import { CardList, CardListItem, SettingCardContainer } from "../styles";
import FormIpRules from "./_components/FormIpRules";
import FormHoneyPot from "./_components/FormHoneyPot";
import FormWebsites from "./_components/FormWebsites";
// Utils
import { PlanTypeId, config } from "@basestack/utils";
// Server
import { api } from "utils/trpc/react";

const { hasFormsPermission } = config.plans;

const SecuritySettingsPage = () => {
  const { formId } = useParams<{ formId: string }>();

  const { data } = api.form.byId.useQuery(
    { formId },
    {
      enabled: !!formId,
    }
  );

  const planId = useMemo(() => {
    return (data?.owner?.subscription?.planId ?? PlanTypeId.FREE) as PlanTypeId;
  }, [data]);

  return (
    <CardList>
      {hasFormsPermission(data?.role, "edit_form_security_websites") && (
        <CardListItem>
          <SettingCardContainer>
            <FormWebsites websites={data?.websites ?? ""} planId={planId} />
          </SettingCardContainer>
        </CardListItem>
      )}
      {hasFormsPermission(data?.role, "edit_form_security_ip_rules") && (
        <CardListItem>
          <SettingCardContainer>
            <FormIpRules
              blockIpAddresses={data?.blockIpAddresses ?? ""}
              planId={planId}
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
