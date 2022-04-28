import React, { Fragment, useEffect } from "react";
// Router
import { useRouter } from "next/router";
// Store
// import { useSelector } from "react-redux";
// import { RootState } from "store";
// Auth
import { useSession } from "next-auth/react";

interface Props {
  children: React.ReactNode;
}

const MainLayout = ({ children }: Props) => {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/auth/sign-in");
    },
  });
  /* const isNavCollapsed = useSelector(
    (store: RootState) => store.app.isNavCollapsed
  ); */

  if (status === "loading") {
    return <div>isLoading</div>;
  }

  return (
    <Fragment>
      <h1>Hello App</h1>
      {children}
    </Fragment>
  );
};

export default MainLayout;
