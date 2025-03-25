"use client";

import { Suspense } from "react";
// UI
import { StatusPage } from "@basestack/ui";
// Navigation
import { useSearchParams } from "next/navigation";
// Utils
import { config } from "@basestack/utils";
// Locales
import { useTranslations } from "next-intl";

const ErrorStatus = () => {
  const t = useTranslations("common");
  const searchParams = useSearchParams();

  return (
    <StatusPage
      type="error"
      title={t("status.form.error.title")}
      description={
        searchParams.get("message") || t("status.form.error.description")
      }
      brand={{
        text: t("brand.powered.forms"),
        onClick: () => window.open(config.urls.product.forms, "_blank"),
      }}
      button={{
        text: t("status.form.error.action"),
        onClick: () =>
          window.open(searchParams.get("goBackUrl") ?? "/", "_blank"),
      }}
    />
  );
};

const FormErrorSuccess = () => {
  return (
    <Suspense>
      <ErrorStatus />
    </Suspense>
  );
};

export default FormErrorSuccess;
