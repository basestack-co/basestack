import React, { Fragment } from "react";
// Router
import { useRouter } from "next/router";
// Store
// import { useSelector } from "react-redux";
// import { RootState } from "store";
// Auth
import { useSession } from "next-auth/react";
import { Navigation } from "design-system";

const MainLayout: React.FC = ({ children }) => {
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
      <Navigation />
      {children}
    </Fragment>
  );
};

export default MainLayout;
