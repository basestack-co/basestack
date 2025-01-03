"use client";

import React from "react";
// Router
import { useParams } from "next/navigation";
// Components
import { CardList, CardListItem, SettingCardContainer } from "../styles";
import FormName from "./_components/FormName";
import DeleteForm from "./_components/DeleteForm";
import EnableForm from "./_components/EnableForm";
import FormDataRetention from "./_components/FormDataRetention";
import FormWebHookUrl from "./_components/FormWebHookUrl";
import FormEndpoint from "./_components/FormEndpoint";
import FormKey from "./_components/FormKey";
import FormSpamProtection from "./_components/FormSpamProtection";
// Utils
import { PlanTypeId } from "@basestack/utils";
// Server
import { api } from "utils/trpc/react";
// Types
import { Role } from ".prisma/client";

const GeneralSettingsPage = () => {
  const { formId } = useParams<{ formId: string }>();

  const [form, usage] = api.useQueries((t) => [
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

export default GeneralSettingsPage;
