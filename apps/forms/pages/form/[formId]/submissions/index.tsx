import React, { Fragment } from "react";
import Head from "next/head";
// Router
import { useRouter } from "next/router";
// Server
import { trpc } from "libs/trpc";
// Locales
import useTranslation from "next-translate/useTranslation";
// Layout
import MainLayout from "layouts/Main";
import FormSubmissions from "components/FormSubmissions";

const FormSubmissionsPage = () => {
  const { t } = useTranslation("forms");
  const router = useRouter();
  const { formId } = router.query as { formId: string };

  const { data: form } = trpc.form.byId.useQuery(
    { formId },
    {
      enabled: !!formId,
    },
  );

  return (
    <Fragment>
      <Head>
        <title>
          {form?.name ?? "Form"} / {t("seo.submissions")}
        </title>
      </Head>
      <FormSubmissions hasRetention={form?.hasRetention ?? true} name={form?.name ?? ""} />
    </Fragment>
  );
};

FormSubmissionsPage.Layout = MainLayout;

export default FormSubmissionsPage;
