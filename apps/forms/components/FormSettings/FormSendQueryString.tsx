import React, { useEffect } from "react";
// Router
import { useRouter } from "next/router";
// Server
import { trpc } from "libs/trpc";
// UI
import { SwitchSettingCard } from "@basestack/ui";
// Locales
import useTranslation from "next-translate/useTranslation";

export interface Props {}

const FormSendQueryStringCard = () => {
  const router = useRouter();
  const { t } = useTranslation("settings");
  const trpcUtils = trpc.useUtils();

  const { formId } = router.query as { formId: string };

  return (
    <SwitchSettingCard
      title={t("customization.data-query-string.title")}
      description={t("customization.data-query-string.description")}
      checked={false}
      onChange={console.log}
    />
  );
};

export default FormSendQueryStringCard;
