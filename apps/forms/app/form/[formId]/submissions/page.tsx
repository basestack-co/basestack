"use client";

import React, { Fragment } from "react";
import Head from "next/head";
// Router
import { useParams } from "next/navigation";
// Server
import { api } from "utils/trpc/react";
// Locales
import { useTranslations } from "next-intl";
// Components
import FormSubmissions from "components/FormSubmissions";

const FormSubmissionsPage = () => {
  const t = useTranslations("form");
  const { formId } = useParams<{ formId: string }>();

  const { data: form, ...rest } = api.form.byId.useQuery(
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
      <FormSubmissions
        isEnabled={form?.isEnabled ?? true}
        hasRetention={form?.hasRetention ?? true}
        name={form?.name ?? ""}
        blockIpAddresses={form?.blockIpAddresses ?? ""}
      />
    </Fragment>
  );
};

export default FormSubmissionsPage;
