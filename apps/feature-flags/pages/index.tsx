import Head from "next/head";
// Layout
import MainLayout from "../layouts/Main";

import GetStarted from "modules/GetStarted";

const MainPage = () => {
  return (
    <div>
      <Head>
        <title>Remote Flags</title>
      </Head>

      <GetStarted />
    </div>
  );
};

MainPage.Layout = MainLayout;

export default MainPage;
