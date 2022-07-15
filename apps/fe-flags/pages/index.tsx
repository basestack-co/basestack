import Head from "next/head";
import { Button, Avatar } from "@basestack/design-system";
import { useDebounce } from "@basestack/hooks";
// Layout
import MainLayout from "../layouts/Main";
// Context
import useModals from "hooks/useModals";
import { setIsDemoModalOpen } from "contexts/modals/actions";
// Auth
import { useSession, signOut } from "next-auth/react";
// Utils
import { isEmpty } from "@basestack/utils";

import GetStarted from "templates/GetStarted";

const MainPage = () => {
  const { data: session } = useSession();
  const { dispatch } = useModals();

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
          Signed in as {session?.user.email} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </div>
      )}

      <GetStarted />
    </div>
  );
};

MainPage.Layout = MainLayout;

export default MainPage;
