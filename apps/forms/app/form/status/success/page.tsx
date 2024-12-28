"use client";

import { StatusPage } from "@basestack/ui";
// Navigation
import { useParams, useRouter } from "next/navigation";
import Head from "next/head";
// Utils
import { config } from "@basestack/utils";
// Locales
import { useTranslations } from "next-intl";

const FormStatusSuccess = () => {
  const router = useRouter();
  const { goBackUrl } = useParams<{
    goBackUrl: string;
  }>();
  const t = useTranslations("common");

  return (
    <>
      <Head>
        <title>Basestack / Form Submission Success</title>
      </Head>
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
          onClick: () => router.push(goBackUrl),
        }}
      />
    </>
  );
};

export default FormStatusSuccess;
