"use client";

import React from "react";
// Router
import { useParams } from "next/navigation";
// Components
import { CardList, CardListItem, SettingCardContainer } from "../styles";
import FormEmails from "./_components/FormEmails";
// Utils
import { PlanTypeId, config } from "@basestack/utils";
// Server
import { api } from "utils/trpc/react";

const { hasFormsPermission } = config.plans;

const NotificationsSettingsPage = () => {
  const { formId } = useParams<{ formId: string }>();

  const { data } = api.form.byId.useQuery(
    { formId },
    {
      enabled: !!formId,
    },
  );

  return (
    <CardList>
      {hasFormsPermission(data?.role, "edit_form_notifications_emails") && (
        <CardListItem>
          <SettingCardContainer>
            <FormEmails emails={data?.emails ?? ""} planId={PlanTypeId.USAGE} />
          </SettingCardContainer>
        </CardListItem>
      )}
    </CardList>
  );
};

export default NotificationsSettingsPage;
