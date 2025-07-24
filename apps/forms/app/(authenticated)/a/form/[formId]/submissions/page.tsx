"use client";

// Types
import { Role } from ".prisma/client";
// Router
import { useParams } from "next/navigation";
// Locales
import { useTranslations } from "next-intl";
import React, { Fragment, useEffect } from "react";
// Server
import { api } from "utils/trpc/react";
// Components
import FormSubmissions from "./_components/FormSubmissions";

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
