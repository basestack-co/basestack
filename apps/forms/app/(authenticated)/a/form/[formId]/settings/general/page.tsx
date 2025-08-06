"use client";

// Utils
import { config, PlanTypeId } from "@basestack/utils";
// Router
import { useParams } from "next/navigation";
// Server
import { api } from "utils/trpc/react";
// Components
import { CardList, CardListItem, SettingCardContainer } from "../styles";
import DeleteForm from "./_components/DeleteForm";
import EnableForm from "./_components/EnableForm";
import FormDataRetention from "./_components/FormDataRetention";
import FormEndpoint from "./_components/FormEndpoint";
import FormKey from "./_components/FormKey";
import FormName from "./_components/FormName";
import FormOwner from "./_components/FormOwner";
import FormSpamProtection from "./_components/FormSpamProtection";
import FormWebHookUrl from "./_components/FormWebHookUrl";
// React
import { useMemo } from "react";

const { hasPermission, PERMISSIONS } = config;

const GeneralSettingsPage = () => {
  const { formId } = useParams<{ formId: string }>();

  const { data } = api.forms.byId.useQuery(
    { formId },
    {
      enabled: !!formId,
    }
  );

  const permissions = useMemo(
    () => ({
      canUpdate: hasPermission(data?.role, PERMISSIONS.FORM.GENERAL.UPDATE),
      canDelete: hasPermission(data?.role, PERMISSIONS.FORM.GENERAL.DELETE),
      canView: hasPermission(data?.role, PERMISSIONS.FORM.GENERAL.VIEW),
    }),
    [data?.role]
  );

  return (
    <CardList>
      {permissions.canUpdate && (
        <CardListItem>
          <SettingCardContainer>
            <FormName role={data?.role} name={data?.name} />
          </SettingCardContainer>
        </CardListItem>
      )}
      <CardListItem>
        <SettingCardContainer>
          <FormOwner
            name={data?.owner?.name ?? ""}
            email={data?.owner?.email ?? ""}
            image={data?.owner?.image ?? ""}
          />
        </SettingCardContainer>
      </CardListItem>
      {permissions.canView && (
        <CardListItem>
          <SettingCardContainer>
            <FormEndpoint formId={data?.id ?? ""} />
          </SettingCardContainer>
        </CardListItem>
      )}
      {permissions.canView && (
        <CardListItem>
          <SettingCardContainer>
            <FormKey formId={data?.id ?? ""} />
          </SettingCardContainer>
        </CardListItem>
      )}
      {permissions.canUpdate && (
        <CardListItem>
          <SettingCardContainer>
            <EnableForm isEnabled={data?.isEnabled} />
          </SettingCardContainer>
        </CardListItem>
      )}
      {permissions.canUpdate && (
        <CardListItem>
          <SettingCardContainer>
            <FormDataRetention
              isDisabled={!data?.isEnabled}
              hasRetention={data?.hasRetention}
            />
          </SettingCardContainer>
        </CardListItem>
      )}
      {permissions.canUpdate && (
        <CardListItem>
          <SettingCardContainer>
            <FormSpamProtection
              hasSpamProtection={data?.hasSpamProtection}
              isDisabled={!data?.hasRetention || !data?.isEnabled}
            />
          </SettingCardContainer>
        </CardListItem>
      )}
      {permissions.canUpdate && (
        <CardListItem>
          <SettingCardContainer>
            <FormWebHookUrl
              isDisabled={!data?.isEnabled}
              webhookUrl={data?.webhookUrl ?? ""}
            />
          </SettingCardContainer>
        </CardListItem>
      )}
      {permissions.canDelete && (
        <CardListItem>
          <SettingCardContainer>
            <DeleteForm name={data?.name} />
          </SettingCardContainer>
        </CardListItem>
      )}
    </CardList>
  );
};

export default GeneralSettingsPage;
