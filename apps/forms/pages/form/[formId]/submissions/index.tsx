import React from "react";
import Head from "next/head";
// Router
import { useRouter } from "next/router";
// Server
import { trpc } from "libs/trpc";
// Layout
import MainLayout from "layouts/Main";
import FormSubmissions from "components/FormSubmissions";

const FormSubmissionsPage = () => {
  const router = useRouter();
  const { formId } = router.query as { formId: string };

  const { data: form } = trpc.form.byId.useQuery(
    { formId },
    {
      enabled: !!formId,
    },
  );

  return (
    <>
      <Head>
        <title>{form?.name ?? "Form"} / Submissions</title>
      </Head>
      <FormSubmissions name={form?.name ?? ""} />
    </>
  );
};

FormSubmissionsPage.Layout = MainLayout;

export default FormSubmissionsPage;
