import React from "react";
import Head from "next/head";
// Layout
import MainLayout from "../layouts/Main";

const MainPage = () => {
  return (
    <div>
      <Head>
        <title>Basestack / Feature Flags</title>
      </Head>
      <div>Put the content here</div>
    </div>
  );
};

MainPage.Layout = MainLayout;

export default MainPage;
