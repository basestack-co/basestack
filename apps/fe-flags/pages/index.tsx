import Head from "next/head";
import { Button, Avatar } from "design-system";
import { useDebounce } from "sh-hooks";
// Layout
import MainLayout from "../layouts/Main";
// Store
import { useDispatch } from "react-redux";
import { AppDispatch } from "store";
import { setDemoModalOpen } from "store/slices/modals";
// Auth
import { useSession, signIn, signOut } from "next-auth/react";
// Utils
import isEmpty from "lodash.isempty";

import GetStarted from "templates/GetStarted";

const MainPage = () => {
  const { data: session } = useSession();
  const dispatch = useDispatch<AppDispatch>();

  useDebounce(
    () => {
      console.log("debounce");
    },
    1000,
    []
  );

  return (
    <div>
      <Head>
        <title>Remote Flags</title>
      </Head>

      {!isEmpty(session) && (
        <div style={{ display: "none" }}>
          Signed in as {session.user.email} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </div>
      )}

      <GetStarted />
    </div>
  );
};

MainPage.Layout = MainLayout;

export default MainPage;
