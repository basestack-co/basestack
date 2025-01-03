"use client";

import React from "react";
// Router
import { useRouter } from "next/navigation";
// UI
import { NotFound } from "@basestack/ui";
// Locales
import { useTranslations } from "next-intl";

const PageNotFound = () => {
  const t = useTranslations("common");
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
