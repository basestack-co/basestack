import React from "react";
import Head from "next/head";
// Layout
import MainLayout from "layouts/Main";
import FormSubmissions from "components/FormSubmissions";

const FormSubmissionsPage = () => {
  return (
    <>
      <Head>
        <title>{"Form"} / Submissions</title>
      </Head>
      <FormSubmissions />
    </>
  );
};

FormSubmissionsPage.Layout = MainLayout;

export default FormSubmissionsPage;
