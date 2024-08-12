import React from "react";
// Router
import { useRouter } from "next/router";
// UI
import { NotFound } from "@basestack/ui";
// Locales
import useTranslation from "next-translate/useTranslation";

const PageNotFound = () => {
  const { t } = useTranslation("common");
  const router = useRouter();

  return (
    <NotFound
      title={t("not-found.title")}
      description={t("not-found.description")}
      action={t("not-found.action")}
      onClick={() => router.push("/")}
    />
  );
};

export default PageNotFound;
