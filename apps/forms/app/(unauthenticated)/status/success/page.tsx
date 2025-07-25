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

const SuccessStatus = () => {
  const t = useTranslations("common");
  const searchParams = useSearchParams();

  return (
    <StatusPage
      type="success"
      title={t("status.form.success.title")}
      description={t("status.form.success.description")}
      brand={{
        text: t("brand.powered.forms"),
        onClick: () => window.open(config.urls.product.forms, "_blank"),
      }}
      button={{
        text: t("status.form.success.action"),
        onClick: () =>
          window.open(searchParams.get("goBackUrl") ?? "/", "_blank"),
      }}
    />
  );
};

const FormStatusSuccess = () => {
  return (
    <Suspense>
      <SuccessStatus />
    </Suspense>
  );
};

export default FormStatusSuccess;
