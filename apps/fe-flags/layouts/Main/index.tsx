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
// Components
import { TabBar } from "@basestack/design-system";
import Navigation from "./Navigation";
// Server
import { trpc } from "libs/trpc";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.device.max.lg);
  const { dispatch } = useModals();
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/auth/sign-in");
    },
  });

  const { data, isLoading: isLoadingProjects } = trpc.useQuery(
    ["project.all"],
    {
      enabled: status === "authenticated",
    }
  );

  if (status === "loading" || isLoadingProjects) {
    return <div>...isLoading</div>;
  }

  return (
    <Fragment>
      <Navigation isDesktop={!isMobile} data={data} />
      {children}
      {isMobile && (
        <TabBar
          pathname={router.pathname}
          onCreateFlag={() => dispatch(seIstCreateFlagModalOpen(true))}
        />
      )}
    </Fragment>
  );
};

export default MainLayout;
