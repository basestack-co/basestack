// Components
import { CopyCard } from "@basestack/design-system";
// UI
import { SettingCard } from "@basestack/ui";
// Utils
import { getBrowserUrl } from "@basestack/utils";
// Locales
import { useTranslations } from "next-intl";
import React from "react";

const EndpointsCard = () => {
  const t = useTranslations("setting");

  return (
    <SettingCard
      title={t("general.endpoints.title")}
      description={t("general.endpoints.description")}
      hasFooter={false}
    >
      <CopyCard
        maxWidth={400}
        title={t("general.endpoints.copy.title")}
        description={`${getBrowserUrl()}/api/v1`}
        tooltip={{
          defaultText: t("common.copy.url.default"),
          successText: t("common.copy.url.success"),
        }}
      />
    </SettingCard>
  );
};

export default EndpointsCard;
