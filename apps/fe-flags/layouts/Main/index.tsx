import React, { Fragment } from "react";
import { useMediaQuery } from "sh-hooks";
import { useTheme } from "styled-components";
// Router
import { useRouter } from "next/router";
// Store
import { useDispatch } from "react-redux";
import { AppDispatch } from "store";
import { setCreateFlagModalOpen } from "store/slices/modals";
// Auth
import { useSession } from "next-auth/react";
import { Navigation, TabBar } from "design-system";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.device.min.lg);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/auth/sign-in");
    },
  });

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
      {!isDesktop && (
        <TabBar
          pathname={router.pathname}
          onCreateFlag={() => dispatch(setCreateFlagModalOpen(true))}
        />
      )}
    </Fragment>
  );
};

export default MainLayout;
