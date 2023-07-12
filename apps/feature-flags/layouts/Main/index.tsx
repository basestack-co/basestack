import React, { Fragment, useState } from "react";
import { useMediaQuery } from "@basestack/hooks";
import { useTheme } from "styled-components";
// Router
import { useRouter } from "next/router";
// Store
import { useStore } from "store";
// Auth
import { useSession } from "next-auth/react";
// Components
import { Splash, Loader } from "@basestack/design-system";
import NavigationDrawer from "./NavigationDrawer";
import Navigation from "./Navigation";
// Server
import { trpc } from "libs/trpc";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const isMobile = useMediaQuery(theme.device.max.lg);
  const router = useRouter();
  const setCreateFlagModalOpen = useStore(
    (state) => state.setCreateFlagModalOpen,
  );
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/auth/sign-in");
    },
  });

  const { data, isLoading: isLoadingProjects } = trpc.project.all.useQuery(
    undefined,
    { enabled: status === "authenticated" },
  );

  if (status === "loading" || isLoadingProjects) {
    return (
      <Loader>
        <Splash />
      </Loader>
    );
  }

  return (
    <Fragment>
      <Navigation
        onClickMenuButton={() => setIsDrawerOpen(true)}
        isDesktop={!isMobile}
        data={data}
      />
      <NavigationDrawer
        data={data}
        onClickMenuButton={() => setIsDrawerOpen(false)}
        isDrawerOpen={isDrawerOpen}
      />
      {children}
    </Fragment>
  );
};

export default MainLayout;
