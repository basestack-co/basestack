"use client";

// Utils
import { config, PlanTypeId } from "@basestack/utils";
// Router
import { useParams } from "next/navigation";
// React
import { useMemo } from "react";
// Server
import { api } from "utils/trpc/react";
// Components
import { CardList, CardListItem, SettingCardContainer } from "../styles";
import FormEmails from "./_components/FormEmails";

const { hasPermission, PERMISSIONS } = config;

const NotificationsSettingsPage = () => {
  const { formId } = useParams<{ formId: string }>();

  const { data } = api.forms.byId.useQuery(
    { formId },
    {
      enabled: !!formId,
    }
  );

  const permissions = useMemo(
    () => ({
      canView: hasPermission(data?.role, PERMISSIONS.FORM.SETTINGS.VIEW),
    }),
    [data?.role]
  );

  return (
    <CardList>
      {permissions.canView && (
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
