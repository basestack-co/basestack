"use client";

// UI
import { NotFound } from "@basestack/ui";
// Router
import { useRouter } from "next/navigation";
// Locales
import { useTranslations } from "next-intl";
import React from "react";

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
