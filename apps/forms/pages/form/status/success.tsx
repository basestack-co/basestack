import { StatusPage } from "@basestack/ui";
// Navigation
import { useRouter } from "next/router";
import Head from "next/head";
// Utils
import { config } from "@basestack/utils";
// Locales
import useTranslation from "next-translate/useTranslation";

const FormStatusSuccess = () => {
  const router = useRouter();
  const goBackUrl = router.query.goBackUrl as string;
  const { t } = useTranslation("common");

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
          onClick: () =>
            router.push({
              pathname: goBackUrl,
            }),
        }}
      />
    </>
  );
};

export default FormStatusSuccess;
