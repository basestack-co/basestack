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
import FormSuccessUrl from "components/FormSettings/FormSuccessUrl";
import FormFailedUrl from "components/FormSettings/FormFailedUrl";
import FormSendQueryString from "components/FormSettings/FormSendQueryString";
import FormRedirectUrl from "components/FormSettings/FormRedirectUrl";
// Utils
import { PlanTypeId } from "@basestack/utils";
// Server
import { trpc } from "libs/trpc";

const CustomizationSettingsPage = () => {
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
          <FormSendQueryString
            hasDataQueryString={form.data?.hasDataQueryString}
            planId={planId}
          />
        </SettingCardContainer>
      </CardListItem>
      <CardListItem>
        <SettingCardContainer>
          <FormRedirectUrl
            redirectUrl={form.data?.redirectUrl ?? ""}
            planId={planId}
          />
        </SettingCardContainer>
      </CardListItem>
      <CardListItem>
        <SettingCardContainer>
          <FormSuccessUrl
            successUrl={form.data?.successUrl ?? ""}
            planId={planId}
          />
        </SettingCardContainer>
      </CardListItem>
      <CardListItem>
        <SettingCardContainer>
          <FormFailedUrl errorUrl={form.data?.errorUrl ?? ""} planId={planId} />
        </SettingCardContainer>
      </CardListItem>
    </CardList>
  );
};

CustomizationSettingsPage.Layout = SettingsLayout;

export default CustomizationSettingsPage;
