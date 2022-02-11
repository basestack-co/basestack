import Head from "next/head";
import { Button } from "ui/atoms";
// Layout
import MainLayout from "../layouts/Main";

const MainPage = () => {
  return (
    <div>
      <Head>
        <title>Remote Flags</title>
      </Head>
      <Button>Hey</Button>
    </div>
  );
};

MainPage.Layout = MainLayout;

export default MainPage;
