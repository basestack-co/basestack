import React, { Fragment } from "react";
import { useMediaQuery } from "@basestack/hooks";
import { useTheme } from "styled-components";
// Router
import { useRouter } from "next/router";
// Context
import useModals from "hooks/useModals";
import { seIstCreateFlagModalOpen } from "contexts/modals/actions";
// Auth
import { useSession } from "next-auth/react";
import { Navigation, TabBar } from "@basestack/design-system";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.device.min.lg);
  const router = useRouter();
  const { dispatch } = useModals();
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
        onCreateFlag={() => dispatch(seIstCreateFlagModalOpen(true))}
      />
      {children}
      {!isDesktop && (
        <TabBar
          pathname={router.pathname}
          onCreateFlag={() => dispatch(seIstCreateFlagModalOpen(true))}
        />
      )}
    </Fragment>
  );
};

export default MainLayout;
