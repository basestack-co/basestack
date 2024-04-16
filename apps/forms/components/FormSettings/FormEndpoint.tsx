import React from "react";
// UI
import { SettingCard } from "@basestack/ui";
// Components
import { CopyCard } from "@basestack/design-system";
// Locales
import useTranslation from "next-translate/useTranslation";
import { getBrowserUrl } from "@basestack/utils";

export interface Props {
  formId: string;
}

const FormEndpointCard = ({ formId }: Props) => {
  const { t } = useTranslation("settings");

  return (
    <SettingCard
      title={t("general.endpoints.title")}
      description={t("general.endpoints.description")}
      hasFooter={false}
    >
      <CopyCard
        maxWidth={400}
        title={t("general.endpoints.copy.title")}
        description={`${getBrowserUrl()}/api/v1/s/${formId}`}
        tooltip={{
          defaultText: t("common.copy.url.default"),
          successText: t("common.copy.url.success"),
        }}
      />
    </SettingCard>
  );
};

export default FormEndpointCard;
