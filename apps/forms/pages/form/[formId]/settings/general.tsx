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
import FormSpamProtection from "components/FormSettings/FormSpamProtection";
// Utils
import { PlanTypeId } from "@basestack/utils";
// Server
import { trpc } from "libs/trpc";
// Types
import { Role } from "@prisma/client";

const GeneralSettingsPage = () => {
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
          <FormName role={form.data?.role} name={form.data?.name} />
        </SettingCardContainer>
      </CardListItem>
      <CardListItem>
        <SettingCardContainer>
          <FormEndpoint formId={form.data?.id ?? ""} />
        </SettingCardContainer>
      </CardListItem>
      <CardListItem>
        <SettingCardContainer>
          <FormKey formId={form.data?.id ?? ""} />
        </SettingCardContainer>
      </CardListItem>
      <CardListItem>
        <SettingCardContainer>
          <EnableForm isEnabled={form.data?.isEnabled} />
        </SettingCardContainer>
      </CardListItem>
      <CardListItem>
        <SettingCardContainer>
          <FormDataRetention hasRetention={form.data?.hasRetention} />
        </SettingCardContainer>
      </CardListItem>
      <CardListItem>
        <SettingCardContainer>
          <FormSpamProtection
            hasSpamProtection={form.data?.hasSpamProtection}
            isDisabled={!form.data?.hasRetention}
            planId={planId}
          />
        </SettingCardContainer>
      </CardListItem>
      <CardListItem>
        <SettingCardContainer>
          <FormWebHookUrl
            webhookUrl={form.data?.webhookUrl ?? ""}
            planId={planId}
          />
        </SettingCardContainer>
      </CardListItem>
      {form.data?.role === Role.ADMIN && (
        <CardListItem>
          <SettingCardContainer>
            <DeleteForm name={form.data?.name} />
          </SettingCardContainer>
        </CardListItem>
      )}
    </CardList>
  );
};

GeneralSettingsPage.Layout = SettingsLayout;

export default GeneralSettingsPage;
