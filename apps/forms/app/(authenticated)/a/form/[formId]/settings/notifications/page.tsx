"use client";

// Utils
import { config, PlanTypeId } from "@basestack/utils";
// Router
import { useParams } from "next/navigation";
// Server
import { api } from "utils/trpc/react";
// Components
import { CardList, CardListItem, SettingCardContainer } from "../styles";
import FormEmails from "./_components/FormEmails";

const { hasFormsPermission } = config.plans;

const NotificationsSettingsPage = () => {
  const { formId } = useParams<{ formId: string }>();

  const { data } = api.forms.byId.useQuery(
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
