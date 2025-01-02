"use client";

import { StatusPage } from "@basestack/ui";
// Navigation
import { useParams } from "next/navigation";
// Utils
import { config } from "@basestack/utils";
// Locales
import { useTranslations } from "next-intl";

const FormErrorSuccess = () => {
  const { message, goBackUrl } = useParams<{
    message: string;
    goBackUrl: string;
  }>();

  const t = useTranslations("common");

  return (
    <StatusPage
      type="error"
      title={t("status.form.error.title")}
      description={message || t("status.form.error.description")}
      brand={{
        text: t("brand.powered.forms"),
        onClick: () => window.open(config.urls.product.forms, "_blank"),
      }}
      button={{
        text: t("status.form.error.action"),
        onClick: () => window.open(goBackUrl ?? "/", "_blank"),
      }}
    />
  );
};

export default FormErrorSuccess;
