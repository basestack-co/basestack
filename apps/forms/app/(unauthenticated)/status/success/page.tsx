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
