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
import FormName from "components/FormSettings/FormName";
import DeleteForm from "components/FormSettings/DeleteForm";
import EnableForm from "components/FormSettings/EnableForm";
import FormDataRetention from "components/FormSettings/FormDataRetention";
import FormWebHookUrl from "components/FormSettings/FormWebHookUrl";
import FormEndpoint from "components/FormSettings/FormEndpoint";
import FormKey from "components/FormSettings/FormKey";
// Server
import { trpc } from "libs/trpc";
// Types
import { Role } from "@prisma/client";

const GeneralSettingsPage = () => {
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
          <FormName role={form?.role} name={form?.name} />
        </SettingCardContainer>
      </CardListItem>
      <CardListItem>
        <SettingCardContainer>
          <FormEndpoint formId={form?.id ?? ""} />
        </SettingCardContainer>
      </CardListItem>
      <CardListItem>
        <SettingCardContainer>
          <FormKey formId={form?.id ?? ""} />
        </SettingCardContainer>
      </CardListItem>
      <CardListItem>
        <SettingCardContainer>
          <EnableForm isEnabled={form?.isEnabled} />
        </SettingCardContainer>
      </CardListItem>
      <CardListItem>
        <SettingCardContainer>
          <FormDataRetention hasRetention={form?.hasRetention} />
        </SettingCardContainer>
      </CardListItem>
      <CardListItem>
        <SettingCardContainer>
          <FormWebHookUrl webhookUrl={form?.webhookUrl ?? ""} />
        </SettingCardContainer>
      </CardListItem>
      {form?.role === Role.ADMIN && (
        <CardListItem>
          <SettingCardContainer>
            <DeleteForm name={form?.name} />
          </SettingCardContainer>
        </CardListItem>
      )}
    </CardList>
  );
};

GeneralSettingsPage.Layout = SettingsLayout;

export default GeneralSettingsPage;
