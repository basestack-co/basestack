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

const FormSpamProtectionCard = () => {
  const router = useRouter();
  const { t } = useTranslation("settings");
  const trpcUtils = trpc.useUtils();

  const { formId } = router.query as { formId: string };

  return (
    <SwitchSettingCard
      title={t("security.spam-protection.title")}
      description={t("security.spam-protection.description")}
      checked={false}
      onChange={console.log}
    />
  );
};

export default FormSpamProtectionCard;
