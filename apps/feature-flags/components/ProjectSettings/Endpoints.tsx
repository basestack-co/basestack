import React from "react";
// Components
import { CopyCard } from "@basestack/design-system";
import SettingCard from "../SettingCard";
// Utils
import { Url } from "@basestack/utils";
// Locales
import useTranslation from "next-translate/useTranslation";

const EndpointsCard = () => {
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
        description={`${Url.getBrowserUrl()}/api/v1`}
        tooltip={{
          defaultText: t("common.copy.url.default"),
          successText: t("common.copy.url.success"),
        }}
      />
    </SettingCard>
  );
};

export default EndpointsCard;
