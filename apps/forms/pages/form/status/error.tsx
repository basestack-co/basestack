import { StatusPage } from "@basestack/ui";
// Navigation
import { useRouter } from "next/router";
import Head from "next/head";
// Utils
import { config } from "@basestack/utils";
// Locales
import useTranslation from "next-translate/useTranslation";

const FormErrorSuccess = () => {
  const router = useRouter();
  const message = router.query.message as string;
  const goBackUrl = router.query.goBackUrl as string;
  const { t } = useTranslation("common");

  return (
    <>
      <Head>
        <title>Basestack / Form Submission Error</title>
      </Head>
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
          onClick: () =>
            router.push({
              pathname: goBackUrl,
            }),
        }}
      />
    </>
  );
};

export default FormErrorSuccess;
