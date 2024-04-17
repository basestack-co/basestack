import React from "react";
import Head from "next/head";
// Layout
import MainLayout from "layouts/Main";
import Setup from "components/Setup";

const SetupPage = () => {
  return (
    <>
      <Head>
        <title>{"Form"} / Setup</title>
      </Head>
      <Setup />
    </>
  );
};

SetupPage.Layout = MainLayout;

export default SetupPage;
