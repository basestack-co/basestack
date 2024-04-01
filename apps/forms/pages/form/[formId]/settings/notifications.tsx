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
import FormEmails from "components/FormSettings/FormEmails";
// Server
import { trpc } from "libs/trpc";

const NotificationsSettingsPage = () => {
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
          <FormEmails emails={form?.emails ?? ""} />
        </SettingCardContainer>
      </CardListItem>
    </CardList>
  );
};

NotificationsSettingsPage.Layout = SettingsLayout;

export default NotificationsSettingsPage;
