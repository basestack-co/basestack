"use client";

import React, { Fragment, useEffect } from "react";
// Router
import { useParams } from "next/navigation";
// Server
import { api } from "utils/trpc/react";
// Locales
import { useTranslations } from "next-intl";
// Components
import FormSubmissions from "./_components/FormSubmissions";
// Types
import { Role } from ".prisma/client";

const FormSubmissionsPage = () => {
  const t = useTranslations("form");
  const { formId } = useParams<{ formId: string }>();

  const { data: form } = api.forms.byId.useQuery(
    { formId },
    {
      enabled: !!formId,
    },
  );

  useEffect(() => {
    document.title = `${form?.name ?? "Form"} / ${t("seo.submissions")}`;
  }, [form?.name, t]);

  return (
    <Fragment>
      <FormSubmissions
        isEnabled={form?.isEnabled ?? true}
        hasRetention={form?.hasRetention ?? true}
        name={form?.name ?? ""}
        blockIpAddresses={form?.blockIpAddresses ?? ""}
        formRole={form?.role ?? Role.VIEWER}
      />
    </Fragment>
  );
};

export default FormSubmissionsPage;
