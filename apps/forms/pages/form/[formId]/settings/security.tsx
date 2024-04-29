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
// Server
import { trpc } from "libs/trpc";

const SecuritySettingsPage = () => {
  const router = useRouter();
  const { formId } = router.query as { formId: string };

  const { data: form } = trpc.form.byId.useQuery(
    { formId },
    {
      enabled: !!formId,
    },
  );

  return (
    <CardList>
      <CardListItem>
        <SettingCardContainer>
          <FormWebsites websites={form?.websites ?? ""} />
        </SettingCardContainer>
      </CardListItem>
      <CardListItem>
        <SettingCardContainer>
          <FormIpRules blockIpAddresses={form?.blockIpAddresses ?? ""} />
        </SettingCardContainer>
      </CardListItem>
      <CardListItem>
        <SettingCardContainer>
          <FormHoneyPot honeypot={form?.honeypot ?? ""} />
        </SettingCardContainer>
      </CardListItem>
    </CardList>
  );
};

SecuritySettingsPage.Layout = SettingsLayout;

export default SecuritySettingsPage;
