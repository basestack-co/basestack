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
import FormSpamProtection from "components/FormSettings/FormSpamProtection";
// Server
import { trpc } from "libs/trpc";
// Types
import { SwitchSettingCard } from "@basestack/ui";

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
          <FormSpamProtection />
        </SettingCardContainer>
      </CardListItem>
    </CardList>
  );
};

SecuritySettingsPage.Layout = SettingsLayout;

export default SecuritySettingsPage;
