import React from "react";
// Router
import { useRouter } from "next/router";
// Layout
import SettingsLayout from "layouts/Settings";
// Components
import {
  CardList,
  CardListItem,
  SettingCardContainer,
} from "components/FormSettings/styles";
import FormIpRules from "components/FormSettings/FormIpRules";
import FormHoneyPot from "components/FormSettings/FormHoneyPot";
import FormWebsites from "components/FormSettings/FormWebsites";
// Utils
import { PlanTypeId } from "@basestack/utils";
// Server
import { trpc } from "libs/trpc";

const SecuritySettingsPage = () => {
  const router = useRouter();
  const { formId } = router.query as { formId: string };

  const [form, usage] = trpc.useQueries((t) => [
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

SecuritySettingsPage.Layout = SettingsLayout;

export default SecuritySettingsPage;
