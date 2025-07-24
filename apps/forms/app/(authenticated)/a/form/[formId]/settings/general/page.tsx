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

const { hasFormsPermission } = config.plans;

const GeneralSettingsPage = () => {
  const { formId } = useParams<{ formId: string }>();

  const { data } = api.forms.byId.useQuery(
    { formId },
    {
      enabled: !!formId,
    },
  );

  return (
    <CardList>
      {hasFormsPermission(data?.role, "edit_form_name") && (
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
      {hasFormsPermission(data?.role, "view_form_endpoint") && (
        <CardListItem>
          <SettingCardContainer>
            <FormEndpoint formId={data?.id ?? ""} />
          </SettingCardContainer>
        </CardListItem>
      )}
      {hasFormsPermission(data?.role, "view_form_id") && (
        <CardListItem>
          <SettingCardContainer>
            <FormKey formId={data?.id ?? ""} />
          </SettingCardContainer>
        </CardListItem>
      )}
      {hasFormsPermission(data?.role, "enable_form") && (
        <CardListItem>
          <SettingCardContainer>
            <EnableForm isEnabled={data?.isEnabled} />
          </SettingCardContainer>
        </CardListItem>
      )}
      {hasFormsPermission(data?.role, "enable_form_data_retention") && (
        <CardListItem>
          <SettingCardContainer>
            <FormDataRetention hasRetention={data?.hasRetention} />
          </SettingCardContainer>
        </CardListItem>
      )}
      {hasFormsPermission(data?.role, "enable_form_spam_protection") && (
        <CardListItem>
          <SettingCardContainer>
            <FormSpamProtection
              hasSpamProtection={data?.hasSpamProtection}
              isDisabled={!data?.hasRetention}
              planId={PlanTypeId.USAGE}
            />
          </SettingCardContainer>
        </CardListItem>
      )}
      {hasFormsPermission(data?.role, "enable_form_webhook") && (
        <CardListItem>
          <SettingCardContainer>
            <FormWebHookUrl
              webhookUrl={data?.webhookUrl ?? ""}
              planId={PlanTypeId.USAGE}
            />
          </SettingCardContainer>
        </CardListItem>
      )}
      {hasFormsPermission(data?.role, "delete_form") && (
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
