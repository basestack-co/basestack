"use client";

import { StatusPage } from "@basestack/ui";
// Navigation
import { useParams } from "next/navigation";
// Utils
import { config } from "@basestack/utils";
// Locales
import { useTranslations } from "next-intl";

const FormStatusSuccess = () => {
  const { goBackUrl } = useParams<{
    goBackUrl: string;
  }>();
  const t = useTranslations("common");

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
        onClick: () => window.open(goBackUrl ?? "/", "_blank"),
      }}
    />
  );
};

export default FormStatusSuccess;
