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

const FormKeyCard = ({ formId }: Props) => {
  const { t } = useTranslation("settings");

  return (
    <SettingCard
      title={t("general.form-key.title")}
      description={t("general.form-key.description")}
      hasFooter={false}
    >
      <CopyCard
        maxWidth={400}
        title={t("general.form-key.copy.title")}
        description={formId}
        tooltip={{
          defaultText: t("common.copy.key.default"),
          successText: t("common.copy.key.success"),
        }}
      />
    </SettingCard>
  );
};

export default FormKeyCard;
