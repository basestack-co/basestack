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

const FormDataRetentionCard = () => {
  const router = useRouter();
  const { t } = useTranslation("settings");
  const trpcUtils = trpc.useUtils();

  const { formId } = router.query as { formId: string };

  return (
    <SwitchSettingCard
      title={t("general.data-retention.title")}
      description={t("general.data-retention.description")}
      checked={false}
      onChange={console.log}
    />
  );
};

export default FormDataRetentionCard;
