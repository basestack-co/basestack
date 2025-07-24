// Components
import { CopyCard } from "@basestack/design-system";
// UI
import { SettingCard } from "@basestack/ui";
// Locales
import { useTranslations } from "next-intl";
import React from "react";

export interface Props {
  formId: string;
}

const FormKeyCard = ({ formId }: Props) => {
  const t = useTranslations("setting");

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
