import React, { Fragment } from "react";
// Router
import { useRouter } from "next/router";
// Store
import { useDispatch } from "react-redux";
import { AppDispatch } from "store";
import { setCreateFlagModalOpen } from "store/slices/modals";
// Auth
import { useSession } from "next-auth/react";
import { Navigation } from "design-system";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
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
      <Navigation
        pathname={router.pathname}
        onCreateFlag={() => dispatch(setCreateFlagModalOpen(true))}
      />
      {children}
    </Fragment>
  );
};

export default MainLayout;
