import Head from "next/head";
import { Button } from "ui/atoms";
// Layout
import MainLayout from "../layouts/Main";
// Store
import { useDispatch } from "react-redux";
import { AppDispatch } from "store";
import { setDemoModalOpen } from "store/slices/modals";

const MainPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div>
      <Head>
        <title>Remote Flags</title>
      </Head>
      <Button onClick={() => dispatch(setDemoModalOpen(true))}>
        Open Modal
      </Button>
    </div>
  );
};

MainPage.Layout = MainLayout;

export default MainPage;
