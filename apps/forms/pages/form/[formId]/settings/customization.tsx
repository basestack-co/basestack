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
// Server
import { trpc } from "libs/trpc";

const CustomizationSettingsPage = () => {
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
          <FormRedirectUrl redirectUrl={form?.redirectUrl ?? ""} />
        </SettingCardContainer>
      </CardListItem>
      <CardListItem>
        <SettingCardContainer>
          <FormSuccessUrl successUrl={form?.successUrl ?? ""} />
        </SettingCardContainer>
      </CardListItem>
      <CardListItem>
        <SettingCardContainer>
          <FormFailedUrl errorUrl={form?.errorUrl ?? ""} />
        </SettingCardContainer>
      </CardListItem>
      <CardListItem>
        <SettingCardContainer>
          <FormSendQueryString hasDataQueryString={form?.hasDataQueryString} />
        </SettingCardContainer>
      </CardListItem>
    </CardList>
  );
};

CustomizationSettingsPage.Layout = SettingsLayout;

export default CustomizationSettingsPage;
