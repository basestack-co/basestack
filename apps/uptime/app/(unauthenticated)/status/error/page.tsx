"use client";

// UI
import { StatusPage } from "@basestack/ui";
// Utils
import { config } from "@basestack/utils";
// Navigation
import { useSearchParams } from "next/navigation";
// Locales
import { useTranslations } from "next-intl";
import { Suspense } from "react";

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
        onClick: () => window.open(config.urls.product.uptime, "_blank"),
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
