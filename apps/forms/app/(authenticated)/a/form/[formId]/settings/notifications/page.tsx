"use client";

import React, { useMemo } from "react";
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

  const planId = useMemo(() => {
    return (data?.owner?.subscription?.planId ?? PlanTypeId.FREE) as PlanTypeId;
  }, [data]);

  return (
    <CardList>
      {hasFormsPermission(data?.role, "edit_form_notifications_emails") && (
        <CardListItem>
          <SettingCardContainer>
            <FormEmails emails={data?.emails ?? ""} planId={planId} />
          </SettingCardContainer>
        </CardListItem>
      )}
    </CardList>
  );
};

export default NotificationsSettingsPage;
