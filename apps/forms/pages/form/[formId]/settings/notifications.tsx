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
// Utils
import { PlanTypeId } from "@basestack/utils";
// Server
import { trpc } from "libs/trpc";

const NotificationsSettingsPage = () => {
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
          <FormEmails emails={form.data?.emails ?? ""} planId={planId} />
        </SettingCardContainer>
      </CardListItem>
    </CardList>
  );
};

NotificationsSettingsPage.Layout = SettingsLayout;

export default NotificationsSettingsPage;
