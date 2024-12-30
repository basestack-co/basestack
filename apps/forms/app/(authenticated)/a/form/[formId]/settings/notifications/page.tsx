"use client";

import React from "react";
// Router
import { useParams } from "next/navigation";
// Components
import { CardList, CardListItem, SettingCardContainer } from "../styles";
import FormEmails from "./FormEmails";
// Utils
import { PlanTypeId } from "@basestack/utils";
// Server
import { api } from "utils/trpc/react";

const NotificationsSettingsPage = () => {
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
          <FormEmails emails={form.data?.emails ?? ""} planId={planId} />
        </SettingCardContainer>
      </CardListItem>
    </CardList>
  );
};

export default NotificationsSettingsPage;
